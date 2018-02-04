import pushObject from './pushObject';
import World from '../world';
import Terminal from '../terminal';

jest.mock('../world');
jest.mock('../terminal');

const world = new World();
const terminal = new Terminal();

afterEach(() => jest.clearAllMocks());

test('\'push object\' matches pattern', () => {
  expect(JSON.stringify('push object'.match(pushObject.pattern))).toEqual(JSON.stringify(['push object', 'object']));
});

test('garbage doesn\'t match pattern', () => {
  expect('dfgdfgdfg'.match(pushObject.pattern)).toEqual(null);
});

test('pushing non existing object results in warning', () => {
  pushObject.action({ world, terminal }, 'push case'.match(pushObject.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You do not see a case here.');
});

test('pushing non pushable object results in warning', () => {
  world.findItemsInRoom.mockImplementation(() => [{
    id: 12,
    name: 'trophy case',
  }]);
  pushObject.action({ world, terminal }, 'push case'.match(pushObject.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You can not push the trophy case.');
});

test('pushing a keyword that relates to two items results in warning', () => {
  world.findItemsInRoom.mockImplementation(() => [
    { name: 'brass goat' },
    { name: 'brass car' },
  ]);
  pushObject.action({ world, terminal }, 'push brass'.match(pushObject.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Do you want to push the brass goat or the brass car?');
});

test('pushing a keyword that relates to three items results in warning', () => {
  world.findItemsInRoom.mockImplementation(() => [
    { name: 'brass goat' },
    { name: 'brass car' },
    { name: 'brass dining set' },
  ]);
  pushObject.action({ world, terminal }, 'push brass'.match(pushObject.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Do you want to push the brass goat, brass car or the brass dining set?');
});

test('pushing valid object results in warning', () => {
  world.findItemsInRoom.mockImplementation(() => [{
    id: 12,
    name: 'wheelbarrow',
    canPush: true,
  }]);
  pushObject.action({ world, terminal }, 'push wheelbarrow'.match(pushObject.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('What direction do you want to push the wheelbarrow?');
});

import pushObjectDirection from './pushObjectDirection';
import World from '../world';
import Terminal from '../terminal';

jest.mock('../world');
jest.mock('../terminal');

const world = new World();
const terminal = new Terminal();

beforeEach(() => {
  world.findItemsInRoom.mockImplementation(() => []);
});
afterEach(() => jest.clearAllMocks());

test('\'push object direction\' matches pattern', () => {
  const text = JSON.stringify('push wheelbarrow north'.match(pushObjectDirection.pattern));
  expect(text).toEqual(JSON.stringify(['push wheelbarrow north', 'wheelbarrow', 'north']));
});

test('garbage doesn\'t match pattern', () => {
  expect('dfgdfgdfg'.match(pushObjectDirection.pattern)).toEqual(null);
});

test('pushing unknown direction results in warning', () => {
  world.findItemsInRoom.mockImplementation(() => [{
    id: 12,
    name: 'trophy case',
  }]);
  pushObjectDirection.action({ world, terminal }, 'push case blah'.match(pushObjectDirection.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('I do not understand the direction \'blah\'.');
});

test('pushing non existing object results in warning', () => {
  pushObjectDirection.action({ world, terminal }, 'push case north'.match(pushObjectDirection.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You do not see a case here.');
});

test('pushing non pushable object results in warning', () => {
  world.findItemsInRoom.mockImplementation(() => [{
    id: 12,
    name: 'trophy case',
  }]);
  pushObjectDirection.action({ world, terminal }, 'push case north'.match(pushObjectDirection.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You can not push the trophy case.');
});

test('pushing a keyword that relates to two items results in warning', () => {
  world.findItemsInRoom.mockImplementation(() => [
    { name: 'brass goat' },
    { name: 'brass car' },
  ]);
  pushObjectDirection.action({ world, terminal }, 'push brass north'.match(pushObjectDirection.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Do you want to push the brass goat or the brass car?');
});

test('pushing a keyword that relates to three items results in warning', () => {
  world.findItemsInRoom.mockImplementation(() => [
    { name: 'brass goat' },
    { name: 'brass car' },
    { name: 'brass dining set' },
  ]);
  pushObjectDirection.action({ world, terminal }, 'push brass north'.match(pushObjectDirection.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Do you want to push the brass goat, brass car or the brass dining set?');
});

test('pushing valid object results in warning', () => {
  world.findItemsInRoom.mockImplementation(() => [{
    id: 12,
    name: 'wheelbarrow',
    canPush: true,
  }]);
  pushObjectDirection.action({ world, terminal }, 'push wheelbarrow north'.match(pushObjectDirection.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You push the wheelbarrow to the north.');
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('');
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Small Field');
});

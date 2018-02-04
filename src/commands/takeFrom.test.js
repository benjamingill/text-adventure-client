import takeFrom from './takeFrom';
import World from '../world';

jest.mock('../world');

const terminal = { appendLine: jest.fn() };

let world;
afterEach(() => {
  jest.clearAllMocks();
  world = new World();
});

test('take from matches pattern', () => {
  expect(JSON.stringify('take from'.match(takeFrom.pattern))).toBe(JSON.stringify(['take from', null, null]));
});

test('take single word object command matches pattern', () => {
  expect(JSON.stringify('take lantern from'.match(takeFrom.pattern))).toBe(JSON.stringify(['take lantern from', 'lantern', null]));
});

test('take multi word object command matches pattern', () => {
  expect(JSON.stringify('take brass lantern from'.match(takeFrom.pattern))).toBe(JSON.stringify(['take brass lantern from', 'brass lantern', null]));
});

test('take single word subject matches pattern', () => {
  expect(JSON.stringify('take lantern from case'.match(takeFrom.pattern))).toBe(JSON.stringify(['take lantern from case', 'lantern', 'case']));
});

test('take multi word subject matches pattern', () => {
  expect(JSON.stringify('take lantern from trophy case'.match(takeFrom.pattern))).toBe(JSON.stringify(['take lantern from trophy case', 'lantern', 'trophy case']));
});

test('nonsense doesn\'t match pattern', () => {
  expect(JSON.stringify('tasdfsdfsdf'.match(takeFrom.pattern))).toBe(JSON.stringify(null));
});

test('\'take from\' results in warning message', () => {
  takeFrom.action({ world, terminal }, 'take from'.match(takeFrom.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Take what from what?');
});

test('\'take something from\' results in warning message', () => {
  takeFrom.action({ world, terminal }, 'take shovel from'.match(takeFrom.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Take shovel from what?');
});

test('\'take from something\' results in warning message', () => {
  takeFrom.action({ world, terminal }, 'take from wheelbarrow'.match(takeFrom.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Take what from the wheelbarrow?');
});

test('taking from a non-container results in warning message', () => {
  world.findItemsInRoom.mockImplementation(() => [{ id: 12, name: 'brass lantern', canTake: true }]);
  takeFrom.action({ world, terminal }, 'take flame from lantern'.match(takeFrom.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You can not take anything from the brass lantern.');
});

test('taking an object from a container moves it to inventory', () => {
  world.getCurrentRoom.mockImplementation(() => 1);
  world.findItemsInRoom.mockImplementation(() => [{
    id: 12,
    name: 'trophy case',
    isContainer: true,
    canClose: false,
  }]);
  world.findItemsInContainer.mockImplementation(() => [
    { id: 13, name: 'jeweled egg', canTake: true },
  ]);

  takeFrom.action({ world, terminal }, 'take egg from case'.match(takeFrom.pattern));

  expect(world.removeItemFromContainer.mock.calls[0][0]).toEqual(12, 13);
  expect(world.addItemToInventory.mock.calls[0][0]).toEqual(13);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You take the jeweled egg from the trophy case.');
});

test('taking an item that fits the description of two items in the container results in a warning', () => {
  world.getCurrentRoom.mockImplementation(() => 1);
  world.findItemsInRoom.mockImplementation(() => [
    { id: 12, name: 'trophy case', isContainer: true },
  ]);
  world.findItemsInContainer.mockImplementation(() => [
    { id: 13, name: 'jeweled egg', canTake: true },
    { id: 13, name: 'jeweled chupacabra', canTake: true },
  ]);

  takeFrom.action({ world, terminal }, 'take jeweled from case'.match(takeFrom.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Do you mean the jeweled egg or the jeweled chupacabra?');
});

test('taking an item that fits the description of three items in the container results in a warning', () => {
  world.getCurrentRoom.mockImplementation(() => 1);
  world.findItemsInRoom.mockImplementation(() => [
    { id: 12, name: 'trophy case', isContainer: true },
  ]);
  world.findItemsInContainer.mockImplementation(() => [
    { id: 12, name: 'brass lantern' },
    { id: 13, name: 'brass key' },
    { id: 13, name: 'brass chupacabra' },
  ]);

  takeFrom.action({ world, terminal }, 'take brass from case'.match(takeFrom.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Do you mean the brass lantern, brass key or the brass chupacabra?');
});

test('taking an item that is not in the container results in a warning', () => {
  world.getCurrentRoom.mockImplementation(() => 1);
  world.findItemsInRoom.mockImplementation(() => [
    { id: 12, name: 'trophy case', isContainer: true },
  ]);
  world.findItemsInContainer.mockImplementation(() => []);

  takeFrom.action({ world, terminal }, 'take jeweled from case'.match(takeFrom.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('There is no \'jeweled\' in the case');
});

test('taking an item that is in the room but not in the container results in a warning', () => {
});

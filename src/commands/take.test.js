import take from './take';
import World from '../world';

jest.mock('../world');

const terminal = { appendLine: jest.fn() };

let world;
afterEach(() => {
  jest.clearAllMocks();
  world = new World();
});

test('take matches pattern', () => {
  expect(JSON.stringify('take'.match(take.pattern))).toBe(JSON.stringify(['take', null]));
});

test('take single word command matches pattern', () => {
  expect(JSON.stringify('take lantern'.match(take.pattern))).toBe(JSON.stringify(['take lantern', 'lantern']));
});

test('take multi-word command matches pattern', () => {
  expect(JSON.stringify('take brass lantern'.match(take.pattern))).toBe(JSON.stringify(['take brass lantern', 'brass lantern']));
});

test('nonsense doesn\'t match pattern', () => {
  expect(JSON.stringify('tasdfsdfsdf'.match(take.pattern))).toBe(JSON.stringify(null));
});

test('\'take\' results in warning message', () => {
  take.action({ world, terminal }, 'take'.match(take.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Take what?');
});

test('taking object in room moves it to inventory', () => {
  world.getCurrentRoom.mockImplementation(() => 1);
  world.findItemsInRoom.mockImplementation(() => [{ id: 12, name: 'brass lantern' }]);

  take.action({ world, terminal }, 'take lantern'.match(take.pattern));

  expect(world.removeItemFromRoom.mock.calls[0][0]).toEqual(1);
  expect(world.removeItemFromRoom.mock.calls[0][1]).toEqual(12);
  expect(world.addItemToInventory.mock.calls[0][0]).toEqual(12);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You take the brass lantern');
});

test('taking an item that fits the description of an item in your inventory results in a warning', () => {
  world.findItemsInInventory.mockImplementation(() => [{ id: 12, name: 'brass lantern' }]);

  take.action({ world, terminal }, 'take lantern'.match(take.pattern));

  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You are already holding the brass lantern!');
});

test('taking an item that fits the description of two items in the room results in a warning', () => {
  world.findItemsInRoom.mockImplementation(() => [
    { id: 12, name: 'brass lantern' },
    { id: 13, name: 'brass key' },
  ]);

  take.action({ world, terminal }, 'take brass'.match(take.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Do you mean the brass lantern or the brass key?');
});

test('taking an item that fits the description of three items in the room results in a warning', () => {
  world.findItemsInRoom.mockImplementation(() => [
    { id: 12, name: 'brass lantern' },
    { id: 13, name: 'brass key' },
    { id: 13, name: 'brass chupacabra' },
  ]);

  take.action({ world, terminal }, 'take brass'.match(take.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Do you mean the brass lantern, brass key or the brass chupacabra?');
});

test('taking an item that fits the description of multiple items in your inventory results in a warning', () => {
  world.findItemsInInventory.mockImplementation(() => [
    { id: 12, name: 'brass lantern' },
    { id: 13, name: 'brass key' },
  ]);

  take.action({ world, terminal }, 'take brass'.match(take.pattern));

  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You are already holding a number of items that fit the description of \'brass\'.');
});

test('taking an item that doesn\'t exist in the room or inventory results in a warning', () => {
  take.action({ world, terminal }, 'take lantern'.match(take.pattern));

  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You do not see a lantern here.');
});


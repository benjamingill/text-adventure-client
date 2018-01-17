import drop from './drop';
import World from '../world';

jest.mock('../world');

const terminal = { appendLine: jest.fn() };

let world;
beforeEach(() => {
  world = new World();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('just typing \'drop\' results in a waring', () => {
  drop.action({ world, terminal }, 'drop'.match(drop.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Drop what?');
});

test('dropped item using single word keyword is removed from inventory', () => {
  world.findItemsInInventory.mockImplementation(() => [({ id: 10, name: 'jeweled egg', keywords: ['jeweled egg'] })]);

  drop.action({ world, terminal }, 'drop egg'.match(drop.pattern));
  expect(world.removeItemFromInventory.mock.calls[0][0]).toEqual(10);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You drop the jeweled egg.');
});

test('dropped item using multi word keyword is removed from inventory', () => {
  world.findItemsInInventory.mockImplementation(() => [({ id: 10, name: 'jeweled egg', keywords: ['jeweled egg'] })]);

  drop.action({ world, terminal }, 'drop jeweled egg'.match(drop.pattern));
  expect(world.removeItemFromInventory.mock.calls[0][0]).toEqual(10);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You drop the jeweled egg.');
});

test('dropped item is added to room items', () => {
  world.getCurrentRoom.mockImplementation(() => 20);
  world.findItemsInInventory.mockImplementation(() => [({ id: 10, name: 'jeweled egg', keywords: ['jeweled egg'] })]);

  drop.action({ world, terminal }, 'drop jeweled egg'.match(drop.pattern));
  expect(world.addItemToRoom.mock.calls[0][0]).toEqual(20);
  expect(world.addItemToRoom.mock.calls[0][1]).toEqual(10);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You drop the jeweled egg.');
});

test('dropping a non-existant item results in a warning', () => {
  drop.action({ world, terminal }, 'drop jeweled egg'.match(drop.pattern));
  expect(world.removeItemFromInventory.mock.calls.length).toEqual(0);
  expect(world.addItemToRoom.mock.calls.length).toEqual(0);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You are not holding a jeweled egg.');
});

test('dropping an item that is currently in the room results in a warning', () => {
  world.findItemsInRoom.mockImplementation(() => [({ id: 10, name: 'jeweled egg', keywords: ['jeweled egg'] })]);
  drop.action({ world, terminal }, 'drop jeweled egg'.match(drop.pattern));
  expect(world.removeItemFromInventory.mock.calls.length).toEqual(0);
  expect(world.addItemToRoom.mock.calls.length).toEqual(0);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You are not currently holding the jeweled egg.');
});

test('dropping an item with a descriptor that matches multiple items in the room results in a warning', () => {
  world.findItemsInRoom.mockImplementation(() => [
    { id: 10, name: 'jeweled egg', keywords: ['jeweled egg', 'jeweled'] },
    { id: 11, name: 'jeweled chupacabra', keywords: ['jeweled chupacabra', 'jeweled'] },
  ]);
  drop.action({ world, terminal }, 'drop jeweled'.match(drop.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You see items here that match that description but you are not holding any of them.');
});

test('using a descriptor that matches two items in inventory results in a warning', () => {
  world.findItemsInInventory.mockImplementation(() => [
    { id: 10, name: 'jeweled egg', keywords: ['jeweled egg', 'jeweled'] },
    { id: 11, name: 'jeweled chupacabra', keywords: ['jeweled chupacabra', 'jeweled'] },
  ]);
  drop.action({ world, terminal }, 'drop jeweled'.match(drop.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Do you mean the jeweled egg or the jeweled chupacabra?');
});

test('using a descriptor that matches three items in inventory results in a warning', () => {
  world.findItemsInInventory.mockImplementation(() => [
    { id: 10, name: 'jeweled egg', keywords: ['jeweled egg', 'jeweled'] },
    { id: 11, name: 'jeweled chupacabra', keywords: ['jeweled chupacabra', 'jeweled'] },
    { id: 12, name: 'jeweled baseball cap', keywords: ['jeweled baseball cap', 'jeweled'] },
  ]);
  drop.action({ world, terminal }, 'drop jeweled'.match(drop.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Do you mean the jeweled egg, the jeweled chupacabra or the jeweled baseball cap?');
});


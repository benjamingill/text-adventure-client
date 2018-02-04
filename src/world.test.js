import _ from 'lodash';
import World from './world';

const mockWorld = {
  rooms: {
    0: { id: 0, name: 'Dirty Test Room' },
    1: { id: 1, name: 'Dirty Test Room 2' },
    2: { id: 1, name: 'Dirty Test Room 3' },
  },
  items: {
    0: { id: 0, name: 'wooden wheelbarrow', keywords: ['wooden wheelbarrow', 'wooden', 'wheelbarrow'] },
    1: { id: 1, name: 'tin bucket', keywords: ['tin bucket', 'tin', 'bucket'] },
    2: { id: 2, name: 'golden locket', keywords: ['golden locket', 'golden', 'locket'] },
  },
  map: [
    { id: 0, items: [{ id: 0, items: [{ id: 1 }] }] },
    { id: 1, items: [] },
  ],
  inv: [],
};

beforeEach(() => {
  localStorage.clear();
});

test('the default world contains a room named \'Limbo\'', () => {
  expect(new World().getRoom(0)).toMatchObject({ name: 'Limbo' });
});

test('instantiating the world again results in the same world', () => {
  let world = new World(mockWorld);
  expect(world.findItemsInRoom(0, 'wheelbarrow').length).toEqual(1);

  world.removeItemFromRoom(0, 0);
  world = new World();
  expect(world.findItemsInRoom(0, 'wheelbarrow').length).toEqual(0);
});

test('the world contains a room named \'Dirty Test Room\'', () => {
  expect(new World(mockWorld).getRoom(0)).toMatchObject({ name: 'Dirty Test Room' });
});

test('the world contains an item named \'wooden wheelbarrow\'', () => {
  expect(new World(mockWorld).getItem(0)).toMatchObject({ name: 'wooden wheelbarrow' });
});

test('the world contains a room with a single wooden wheelbarrow', () => {
  expect(new World(mockWorld).getItemsFromRoom(0)).toMatchObject([{ name: 'wooden wheelbarrow' }]);
});

test('the world has a room with an item that can be queried by keyword', () => {
  expect(new World(mockWorld).findItemsInRoom(0, 'wheelbarrow')).toMatchObject([{ name: 'wooden wheelbarrow' }]);
});

test('the world is okay with querying an empty room for items', () => {
  expect(new World(mockWorld).findItemsInRoom(1, 'wheelbarrow').length).toEqual(0);
});

test('can add an item to a room', () => {
  const world = new World(mockWorld);
  world.addItemToRoom(1, 2);
  expect(world.getItemsFromRoom(1)).toMatchObject([{ name: 'golden locket' }]);
});

test('can add an item to a room that doesn\'t have existing state', () => {
  const world = new World(mockWorld);
  world.addItemToRoom(2, 2);
  expect(world.getItemsFromRoom(2)).toMatchObject([{ name: 'golden locket' }]);
});

test('can not add an item to a room twice', () => {
  const world = new World(mockWorld);
  world.addItemToRoom(1, 2);
  world.addItemToRoom(1, 2);
  expect(world.getItemsFromRoom(1).length).toEqual(1);
});


test('the world has a room with an item that can be removed', () => {
  const world = new World(mockWorld);
  world.removeItemFromRoom(0, 0);
  expect(_.size(world.findItemsInRoom(0, 'wheelbarrow'))).toEqual(0);
});

test('the world has a room with an item that contains another item', () => {
  const world = new World(mockWorld);
  const wheelbarrow = world.getItemsFromRoom(0)[0];
  expect(world.getItemsFromContainer(wheelbarrow.id)).toMatchObject([{ name: 'tin bucket' }]);
});

test('the world has a room with an item that has an item that can be queried by keyword', () => {
  const world = new World(mockWorld);
  const wheelbarrow = world.getItemsFromRoom(0)[0];
  expect(world.findItemsInContainer(wheelbarrow.id, 'tin')).toMatchObject([{ name: 'tin bucket' }]);
});

test('the world is okay with querying an empty item for items', () => {
  expect(new World(mockWorld).findItemsInContainer(2, 'tin').length).toEqual(0);
});

test('the world allows me to remove an item from a room and place it in my inventory', () => {
  const world = new World(mockWorld);
  world.removeItemFromRoom(0, 0);
  world.addItemToInventory(0);

  expect(world.getItemsFromRoom(0).length).toEqual(0);
  expect(world.getItemsFromInventory()).toMatchObject([{ name: 'wooden wheelbarrow' }]);
});

test('the world doesn\'t allow me to add the same object twice to my inventory', () => {
  const world = new World(mockWorld);
  world.addItemToInventory(0);
  world.addItemToInventory(0);

  expect(world.getItemsFromInventory().length).toEqual(1);
});

test('the world has an inventory that lets me query items by keyword', () => {
  const world = new World({ ...mockWorld, inv: [1] });
  expect(world.findItemsInInventory('tin')).toMatchObject([{ name: 'tin bucket' }]);
});

test('the world is okay with querying the inventory for items that don\'t exist', () => {
  expect(new World(mockWorld).findItemsInInventory('dagger').length).toEqual(0);
});

test('the world allows me to remove an item from my inventory', () => {
  const world = new World({ ...mockWorld, inv: [1] });
  world.removeItemFromInventory(1);
  expect(world.getItemsFromInventory().length).toEqual(0);
});

test('the world saves a command in the command store', () => {
  const world = new World(mockWorld);
  world.saveUnhandledCommand('hi there');
  expect(localStorage.getItem('text-adventure:commandStore')).toEqual('["hi there"]');
});

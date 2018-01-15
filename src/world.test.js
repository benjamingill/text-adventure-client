import World from './world';

beforeEach(() => {
  localStorage.clear();
});

test('the world loads a room titled \'Limbo\' with id 0', () => {
  expect(new World().getRoom(0).name).toEqual('Limbo');
});

test('the world loads a room titled \'Field\' with id 4', () => {
  expect(new World().getRoom(4).name).toEqual('Field');
});

test('room 4, the \'Field\' contains a wheelbarrow', () => {
  const items = new World().getItemsFromRoom(4);
  expect(items[0]).toMatchObject({ name: 'wooden wheelbarrow' });
});

test('the wheelbarrow in room 4 contains a shovel', () => {
  const items = new World().getItemsFromRoom(4);
  const childItems = new World().getItemsFromItem(items[0].id);
  expect(childItems[0]).toMatchObject({ name: 'shovel' });
});


import rooms from './world';

test('the world loads a room titled \'Limbo\' with id 0', () => {
  expect(rooms[0].name).toEqual('Limbo');
});

test('the world loads a room titled \'Field\' with id 4 that contains a wooden wheelbarrow, which contains a shovel', () => {
  expect(rooms[4].name).toEqual('Field');
  expect(rooms[4].container[0]).toMatchObject({ name: 'wooden wheelbarrow' });
  expect(rooms[4].container[0].container[0]).toMatchObject({ name: 'shovel' });
});


import * as world from './world';

test('the world loads a room titled \'limbo\' with id 0', () => {
  expect(world.rooms['0'].id).toEqual(0);
  expect(world.rooms['0'].name).toEqual('Limbo');
});

test('the world loads a room titled \'Small Field\' with id 1', () => {
  expect(world.rooms['1'].id).toEqual(1);
  expect(world.rooms['1'].name).toEqual('Small Field');
});

test('the initial starting room is 1', () => {
  expect(world.currentRoom).toEqual(1);
});


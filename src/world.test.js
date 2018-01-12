import rooms from './world';

test('the world loads a room titled \'limbo\' with id 0', () => {
  expect(rooms['0'].id).toEqual(0);
  expect(rooms['0'].name).toEqual('Limbo');
});

test('the world loads a room titled \'Small Field\' with id 1', () => {
  expect(rooms['1'].id).toEqual(1);
  expect(rooms['1'].name).toEqual('Small Field');
});

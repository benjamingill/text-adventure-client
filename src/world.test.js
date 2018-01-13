import rooms from './world';

test('the world loads a room titled \'limbo\' with id 0', () => {
  expect(rooms['0'].name).toEqual('Limbo');
});

import Player from './player';

test('player should start out at initial current room', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  expect(player.getCurrentRoom()).toEqual(1);
});

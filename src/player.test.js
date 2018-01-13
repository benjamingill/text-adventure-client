import Player from './player';

beforeEach(() => {
  localStorage.clear();
});

test('player should start out with correct initial room', () => {
  const player = new Player({ room: 20, score: 0, moves: 0 });
  expect(player.getCurrentRoom()).toEqual(20);
});

test('player should start out with correct initial score', () => {
  const player = new Player({ room: 0, score: 20, moves: 0 });
  expect(player.getCurrentScore()).toEqual(20);
});

test('player should start out with correct initial moves', () => {
  const player = new Player({ room: 0, score: 0, moves: 20 });
  expect(player.getCurrentMoves()).toEqual(20);
});

test('player starts out with stored values if values exist', () => {
  const firstInstance = new Player({ room: 1 });
  expect(firstInstance.getCurrentRoom()).toEqual(1);

  firstInstance.setCurrentRoom(2);

  const secondinstance = new Player();
  expect(secondinstance.getCurrentRoom()).toEqual(2);
});

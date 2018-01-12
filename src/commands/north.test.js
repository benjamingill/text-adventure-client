import Player from '../player';
import parse from '../parser';

beforeEach(() => {
  localStorage.clear();
});

test('currentRoom is correctly updated when player enters \'n\'', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: () => { } } };

  parse(container, 'n');

  expect(player.getCurrentRoom()).toEqual(2);
});

test('currentRoom is correctly updated when player enters \'north\'', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: () => { } } };

  parse(container, 'north');

  expect(player.getCurrentRoom()).toEqual(2);
});

test('terminal is correctly updated when player moves north', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: jest.fn() } };

  parse(container, 'n');

  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the north.');
});

import parse from '../parser';
import Player from '../player';
import { rooms } from '../world';

jest.mock('../world', () => ({
  rooms: {
    1: {
      exits: { n: 2 },
    },
    2: {
      exits: { n: 3 },
    },
    3: {
    },
  },
}));

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});


test('current room is correctly updated when player enters \'n\'', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'n');

  expect(player.getCurrentRoom()).toEqual(2);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the north.');
});

test('current room is correctly updated when player enters \'north\'', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'north');

  expect(player.getCurrentRoom()).toEqual(2);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the north.');
});

test('error is displayed when trying to move north when direction is invalid', () => {
  const player = new Player({ room: 3, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'north');

  expect(player.getCurrentRoom()).toEqual(3);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move that direction.');
});

test('current room is correctly updated when player moves north twice', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };

  expect(player.getCurrentRoom()).toEqual(1);
  parse(container, 'n');
  expect(player.getCurrentRoom()).toEqual(2);
  parse(container, 'n');
  expect(player.getCurrentRoom()).toEqual(3);
});


import parse from '../parser';
import Player from '../player';
import { rooms } from '../world';

jest.mock('../world', () => ({
  rooms: {
    1: {
      exits: { u: 2 },
    },
    2: {
      exits: { u: 3 },
    },
    3: {
    },
  },
}));

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});


test('current room is correctly updated when player enters \'u\'', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'u');

  expect(player.getCurrentRoom()).toEqual(2);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move up.');
});

test('current room is correctly updated when player enters \'up\'', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'up');

  expect(player.getCurrentRoom()).toEqual(2);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move up.');
});

test('error is displayed when trying to move up when direction is invalid', () => {
  const player = new Player({ room: 3, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'up');

  expect(player.getCurrentRoom()).toEqual(3);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move up.');
});

test('current room is correctly updated when player moves up twice', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };

  expect(player.getCurrentRoom()).toEqual(1);
  parse(container, 'u');
  expect(player.getCurrentRoom()).toEqual(2);
  parse(container, 'u');
  expect(player.getCurrentRoom()).toEqual(3);
});


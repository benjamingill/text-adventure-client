import parse from '../parser';
import Player from '../player';
import { rooms } from '../world';

jest.mock('../world', () => ({
  rooms: {
    1: {
      exits: { w: 2 },
    },
    2: {
      exits: { w: 3 },
    },
    3: {
    },
  },
}));

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});


test('current room is correctly updated when player enters \'w\'', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'w');

  expect(player.getCurrentRoom()).toEqual(2);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the west.');
});

test('current room is correctly updated when player enters \'west\'', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'west');

  expect(player.getCurrentRoom()).toEqual(2);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the west.');
});

test('error is displayed when trying to move west when direction is invalid', () => {
  const player = new Player({ room: 3, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'west');

  expect(player.getCurrentRoom()).toEqual(3);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move that direction.');
});

test('current room is correctly updated when player moves west twice', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };

  expect(player.getCurrentRoom()).toEqual(1);
  parse(container, 'w');
  expect(player.getCurrentRoom()).toEqual(2);
  parse(container, 'w');
  expect(player.getCurrentRoom()).toEqual(3);
});


import parse from '../parser';
import Player from '../player';
import { rooms } from '../world';

jest.mock('../world', () => ({
  rooms: {
    1: {
      exits: { e: 2 },
    },
    2: {
      exits: { e: 3 },
    },
    3: {
    },
  },
}));

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});


test('currentRoom is correctly updated when player enters \'e\'', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'e');

  expect(player.getCurrentRoom()).toEqual(2);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the east.');
});

test('currentRoom is correctly updated when player enters \'east\'', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'east');

  expect(player.getCurrentRoom()).toEqual(2);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the east.');
});

test('error is displayed when trying to move east when direction is invalid', () => {
  const player = new Player({ currentRoom: 3, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'east');

  expect(player.getCurrentRoom()).toEqual(3);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move that direction.');
});

test('currentRoom is correctly updated when player moves east twice', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };

  expect(player.getCurrentRoom()).toEqual(1);
  parse(container, 'e');
  expect(player.getCurrentRoom()).toEqual(2);
  parse(container, 'e');
  expect(player.getCurrentRoom()).toEqual(3);
});


import parse from '../parser';
import Player from '../player';
import { rooms } from '../world';

jest.mock('../world', () => ({
  rooms: {
    1: {
      exits: { d: 2 },
    },
    2: {
      exits: { d: 3 },
    },
    3: {
    },
  },
}));

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});


test('currentRoom is correctly updated when player enters \'d\'', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'd');

  expect(player.getCurrentRoom()).toEqual(2);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move down.');
});

test('currentRoom is correctly updated when player enters \'down\'', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'down');

  expect(player.getCurrentRoom()).toEqual(2);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move down.');
});

test('error is displayed when trying to move down when direction is invalid', () => {
  const player = new Player({ currentRoom: 3, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };
  parse(container, 'down');

  expect(player.getCurrentRoom()).toEqual(3);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move down.');
});

test('currentRoom is correctly updated when player moves down twice', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };

  expect(player.getCurrentRoom()).toEqual(1);
  parse(container, 'd');
  expect(player.getCurrentRoom()).toEqual(2);
  parse(container, 'd');
  expect(player.getCurrentRoom()).toEqual(3);
});


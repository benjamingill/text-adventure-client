import parse from '../parser';
import Player from '../player';
import { rooms } from '../world';

jest.mock('../world', () => ({
  rooms: {
    1: {
      name: 'Dirty Test Room',
      description: 'You are standing in a dirty test room. Sucks for you.',
      exits: { n: 2, s: 3 },
    },
    2: {
      name: 'Dirty Test Room 2',
      description: 'You are standing in a dirty test room. Sucks for you.',
    },
  },
}));

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});


test('terminal displays current room when player enters \'l\'', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };

  parse(container, 'l');

  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('Dirty Test Room');
  expect(container.terminal.appendLine.mock.calls[1][0]).toEqual('You are standing in a dirty test room. Sucks for you.');
  expect(container.terminal.appendLine.mock.calls[2][0]).toEqual('[north, south]');
  expect(container.terminal.appendLine.mock.calls[3][0]).toEqual('');
});

test('terminal displays current room when player enters \'look\'', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };

  parse(container, 'l');

  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('Dirty Test Room');
  expect(container.terminal.appendLine.mock.calls[1][0]).toEqual('You are standing in a dirty test room. Sucks for you.');
  expect(container.terminal.appendLine.mock.calls[2][0]).toEqual('[north, south]');
  expect(container.terminal.appendLine.mock.calls[3][0]).toEqual('');
});

test('terminal displays current room correctly when player enters \'look\' and is in brief mode', () => {
  const player = new Player({
    room: 1, score: 0, moves: 0, brief: true,
  });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };

  parse(container, 'l');

  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('Dirty Test Room');
  expect(container.terminal.appendLine.mock.calls[1][0]).toEqual('[n, s]');
  expect(container.terminal.appendLine.mock.calls[2][0]).toEqual('');
});

test('terminal displays no exits if no exits exist', () => {
  const player = new Player({ room: 2, score: 0, moves: 0 });
  const container = { player, rooms, terminal: { appendLine: jest.fn() } };

  parse(container, 'l');

  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('Dirty Test Room 2');
  expect(container.terminal.appendLine.mock.calls[1][0]).toEqual('You are standing in a dirty test room. Sucks for you.');
  expect(container.terminal.appendLine.mock.calls[2][0]).toEqual('[none]');
  expect(container.terminal.appendLine.mock.calls[3][0]).toEqual('');
});

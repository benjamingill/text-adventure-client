import parse from '../parser';
import Player from '../player';
import World from '../world';

jest.mock('../world');

const name = 'Dirty Test Room';
const description = 'You are standing in a dirty test room. Sucks for you.';
const terminal = { appendLine: jest.fn() };

const world = new World();

beforeEach(() => {
  world.getRoom.mockImplementation(() => ({ id: 1, name, description }));
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});


test('terminal displays current room when player enters \'l\'', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });

  world.getRoom.mockImplementation(() => ({ name, description, exits: { n: 2, s: 3 } }));
  const container = { player, world, terminal };

  parse(container, 'l');

  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Dirty Test Room');
  expect(terminal.appendLine.mock.calls[1][0]).toEqual('You are standing in a dirty test room. Sucks for you.');
  expect(terminal.appendLine.mock.calls[2][0]).toEqual('[north, south]');
  expect(terminal.appendLine.mock.calls[3][0]).toEqual('');
});

test('terminal displays current room when player enters \'look\'', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });

  world.getRoom.mockImplementation(() => ({ name, description, exits: { n: 2, s: 3 } }));
  const container = { player, world, terminal };

  parse(container, 'l');

  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Dirty Test Room');
  expect(terminal.appendLine.mock.calls[1][0]).toEqual('You are standing in a dirty test room. Sucks for you.');
  expect(terminal.appendLine.mock.calls[2][0]).toEqual('[north, south]');
  expect(terminal.appendLine.mock.calls[3][0]).toEqual('');
});

test('terminal displays current room correctly when player enters \'look\' and is in brief mode', () => {
  const player = new Player({
    room: 1, score: 0, moves: 0, brief: true,
  });

  world.getRoom.mockImplementation(() => ({ name, description, exits: { n: 2, s: 3 } }));
  const container = { player, world, terminal };

  parse(container, 'l');

  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Dirty Test Room');
  expect(terminal.appendLine.mock.calls[1][0]).toEqual('[n, s]');
  expect(terminal.appendLine.mock.calls[2][0]).toEqual('');
});

test('terminal displays no exits if no exits exist', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });

  world.getRoom.mockImplementation(() => ({ name, description }));
  const container = { player, world, terminal };

  parse(container, 'l');

  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Dirty Test Room');
  expect(terminal.appendLine.mock.calls[1][0]).toEqual('You are standing in a dirty test room. Sucks for you.');
  expect(terminal.appendLine.mock.calls[2][0]).toEqual('[none]');
  expect(terminal.appendLine.mock.calls[3][0]).toEqual('');
});

test('terminal displays an object in the room if an object exists', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });

  world.getRoom.mockImplementation(() => ({ id: 1, name, description }));
  world.getItemsFromRoom.mockImplementation(() => ([{ shortDescription: 'Someone left a coffee mug on the ground here.' }]));
  const container = { player, world, terminal };

  parse(container, 'l');

  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Dirty Test Room');
  expect(terminal.appendLine.mock.calls[1][0]).toEqual('You are standing in a dirty test room. Sucks for you.');
  expect(terminal.appendLine.mock.calls[2][0]).toEqual('[none]');
  expect(terminal.appendLine.mock.calls[3][0]).toEqual('');
  expect(terminal.appendLine.mock.calls[4][0]).toEqual('Someone left a coffee mug on the ground here.');
  expect(terminal.appendLine.mock.calls[5][0]).toEqual('');
});

test('terminal displays an object in the room as closed if the object is a container and is closed', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });

  world.getRoom.mockImplementation(() => ({ id: 1, name, description }));
  world.getItemsFromRoom.mockImplementation(() => ([{
    name: 'metal case',
    shortDescription: 'A tall, metal safe stands against the wall.',
    isContainer: true,
    canClose: true,
    isClosed: true,
  }]));
  const container = { player, world, terminal };

  parse(container, 'l');

  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Dirty Test Room');
  expect(terminal.appendLine.mock.calls[1][0]).toEqual('You are standing in a dirty test room. Sucks for you.');
  expect(terminal.appendLine.mock.calls[2][0]).toEqual('[none]');
  expect(terminal.appendLine.mock.calls[3][0]).toEqual('');
  expect(terminal.appendLine.mock.calls[4][0]).toEqual('A tall, metal safe stands against the wall. (closed)');
  expect(terminal.appendLine.mock.calls[5][0]).toEqual('');
});

test('terminal displays an object in the room as opened if the object is a container and is opened', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });

  world.getRoom.mockImplementation(() => ({ id: 1, name, description }));
  world.getItemsFromRoom.mockImplementation(() => ([{
    name: 'metal case',
    shortDescription: 'A tall, metal safe stands against the wall.',
    isContainer: true,
    canClose: true,
    isClosed: false,
  }]));
  const container = { player, world, terminal };

  parse(container, 'l');

  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Dirty Test Room');
  expect(terminal.appendLine.mock.calls[1][0]).toEqual('You are standing in a dirty test room. Sucks for you.');
  expect(terminal.appendLine.mock.calls[2][0]).toEqual('[none]');
  expect(terminal.appendLine.mock.calls[3][0]).toEqual('');
  expect(terminal.appendLine.mock.calls[4][0]).toEqual('A tall, metal safe stands against the wall. (opened)');
  expect(terminal.appendLine.mock.calls[5][0]).toEqual('The metal case contains:');
});

test('terminal displays an object in the room as neither opened nor closed if the object is a container that can\'t be closed', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });

  world.getRoom.mockImplementation(() => ({ id: 1, name, description }));
  world.getItemsFromRoom.mockImplementation(() => ([{
    name: 'stupid wheelbarrow',
    shortDescription: 'A god-damn wheelbarrow is here.',
    isContainer: true,
    canClose: false,
  }]));
  const container = { player, world, terminal };

  parse(container, 'l');

  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Dirty Test Room');
  expect(terminal.appendLine.mock.calls[1][0]).toEqual('You are standing in a dirty test room. Sucks for you.');
  expect(terminal.appendLine.mock.calls[2][0]).toEqual('[none]');
  expect(terminal.appendLine.mock.calls[3][0]).toEqual('');
  expect(terminal.appendLine.mock.calls[4][0]).toEqual('A god-damn wheelbarrow is here.');
  expect(terminal.appendLine.mock.calls[5][0]).toEqual('The stupid wheelbarrow contains:');
  expect(terminal.appendLine.mock.calls[6][0]).toEqual(' nothing');
});

test('terminal displays an object in the inventory of an opened container', () => {
  const player = new Player({ room: 1, score: 0, moves: 0 });

  world.getRoom.mockImplementation(() => ({ id: 1, name, description }));
  world.getItemsFromRoom.mockImplementation(() => ([{
    name: 'stupid wheelbarrow',
    shortDescription: 'A god-damn wheelbarrow is here.',
    isContainer: true,
    canClose: false,
  }]));
  world.getItemsFromItem.mockImplementation(() => ([{
    inventoryDescription: 'a shovel',
  }]));
  const container = { player, world, terminal };

  parse(container, 'l');

  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Dirty Test Room');
  expect(terminal.appendLine.mock.calls[1][0]).toEqual('You are standing in a dirty test room. Sucks for you.');
  expect(terminal.appendLine.mock.calls[2][0]).toEqual('[none]');
  expect(terminal.appendLine.mock.calls[3][0]).toEqual('');
  expect(terminal.appendLine.mock.calls[4][0]).toEqual('A god-damn wheelbarrow is here.');
  expect(terminal.appendLine.mock.calls[5][0]).toEqual('The stupid wheelbarrow contains:');
  expect(terminal.appendLine.mock.calls[6][0]).toEqual(' a shovel');
});

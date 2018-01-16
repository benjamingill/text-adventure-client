import east from './east';
import World from '../world';

jest.mock('./look');
jest.mock('../world');

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('current room is correctly updated when player enters \'e\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { e: 10 } }));

  const container = { world, terminal: { appendLine: jest.fn() } };

  east.action(container, 'e');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the east.');
});

test('current room is correctly updated when player enters \'east\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { e: 10 } }));

  const container = { world, terminal: { appendLine: jest.fn() } };

  east.action(container, 'east');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the east.');
});

test('error is displayed when trying to move east when direction is invalid', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({}));

  const container = { world, terminal: { appendLine: jest.fn() } };

  east.action(container, 'east');

  expect(world.setCurrentRoom.mock.calls.length).toEqual(0);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move in that direction.');
});

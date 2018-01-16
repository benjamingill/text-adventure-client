import west from './west';
import World from '../world';

jest.mock('./look');
jest.mock('../world');

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('current room is correctly updated when player enters \'w\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { w: 10 } }));

  const container = { world, terminal: { appendLine: jest.fn() } };

  west.action(container, 'w');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the west.');
});

test('current room is correctly updated when player enters \'west\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { w: 10 } }));

  const container = { world, terminal: { appendLine: jest.fn() } };

  west.action(container, 'west');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the west.');
});

test('error is displayed when trying to move west when direction is invalid', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({}));

  const container = { world, terminal: { appendLine: jest.fn() } };

  west.action(container, 'west');

  expect(world.setCurrentRoom.mock.calls.length).toEqual(0);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move in that direction.');
});

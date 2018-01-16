import north from './north';
import World from '../world';

jest.mock('./look');
jest.mock('../world');

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('current room is correctly updated when player enters \'n\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { n: 10 } }));

  const container = { world, terminal: { appendLine: jest.fn() } };

  north.action(container, 'e');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the north.');
});

test('current room is correctly updated when player enters \'north\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { n: 10 } }));

  const container = { world, terminal: { appendLine: jest.fn() } };

  north.action(container, 'north');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the north.');
});

test('error is displayed when trying to move north when direction is invalid', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({}));

  const container = { world, terminal: { appendLine: jest.fn() } };

  north.action(container, 'north');

  expect(world.setCurrentRoom.mock.calls.length).toEqual(0);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move in that direction.');
});

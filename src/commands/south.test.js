import south from './south';
import World from '../world';

jest.mock('./look');
jest.mock('../world');

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('current room is correctly updated when player enters \'s\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { s: 10 } }));

  const container = { world, terminal: { appendLine: jest.fn() } };

  south.action(container, 's');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the south.');
});

test('current room is correctly updated when player enters \'south\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { s: 10 } }));

  const container = { world, terminal: { appendLine: jest.fn() } };

  south.action(container, 'south');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You move to the south.');
});

test('error is displayed when trying to move south when direction is invalid', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({}));

  const container = { world, terminal: { appendLine: jest.fn() } };

  south.action(container, 'south');

  expect(world.setCurrentRoom.mock.calls.length).toEqual(0);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move in that direction.');
});

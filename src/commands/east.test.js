import Terminal from '../terminal';
import east from './east';
import World from '../world';

jest.mock('./look');
jest.mock('../world');
jest.mock('../terminal');

const terminal = new Terminal();

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('current room is correctly updated when player enters \'e\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { e: 10 } }));

  east.action({ world, terminal }, 'e');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You move to the east.');
});

test('current room is correctly updated when player enters \'east\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { e: 10 } }));

  east.action({ world, terminal }, 'east');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You move to the east.');
});

test('error is displayed when trying to move east when direction is invalid', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({}));

  east.action({ world, terminal }, 'east');

  expect(world.setCurrentRoom.mock.calls.length).toEqual(0);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move in that direction.');
});

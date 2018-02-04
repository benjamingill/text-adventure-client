import north from './north';
import World from '../world';
import Terminal from '../terminal';

jest.mock('./look');
jest.mock('../world');
jest.mock('../terminal');

const terminal = new Terminal();

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('current room is correctly updated when player enters \'n\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { n: 10 } }));

  north.action({ world, terminal }, 'e');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You move to the north.');
});

test('current room is correctly updated when player enters \'north\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { n: 10 } }));

  north.action({ world, terminal }, 'north');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You move to the north.');
});

test('error is displayed when trying to move north when direction is invalid', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({}));

  north.action({ world, terminal }, 'north');

  expect(world.setCurrentRoom.mock.calls.length).toEqual(0);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move in that direction.');
});

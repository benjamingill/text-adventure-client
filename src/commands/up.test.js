import up from './up';
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

test('current room is correctly updated when player enters \'u\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { u: 10 } }));

  up.action({ world, terminal }, 'u');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You move up.');
});

test('current room is correctly updated when player enters \'up\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { u: 10 } }));

  up.action({ world, terminal }, 'up');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You move up.');
});

test('error is displayed when trying to move up when direction is invalid', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({}));

  up.action({ world, terminal }, 'up');

  expect(world.setCurrentRoom.mock.calls.length).toEqual(0);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move up.');
});

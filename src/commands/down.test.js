import Terminal from '../terminal';
import down from './down';
import World from '../world';

jest.mock('./look');
jest.mock('../world');
jest.mock('../terminal');

const terminal = new Terminal();

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('current room is correctly updated when player enters \'d\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { d: 10 } }));

  down.action({ world, terminal }, 'd');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You move down.');
});

test('current room is correctly updated when player enters \'down\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { d: 10 } }));

  down.action({ world, terminal }, 'down');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You move down.');
});

test('error is displayed when trying to move down when direction is invalid', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({}));

  down.action({ world, terminal }, 'down');

  expect(world.setCurrentRoom.mock.calls.length).toEqual(0);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move down.');
});

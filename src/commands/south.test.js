import south from './south';
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

test('current room is correctly updated when player enters \'s\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { s: 10 } }));

  south.action({ world, terminal }, 's');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You move to the south.');
});

test('current room is correctly updated when player enters \'south\'', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({ exits: { s: 10 } }));

  south.action({ world, terminal }, 'south');

  expect(world.setCurrentRoom.mock.calls[0][0]).toEqual(10);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You move to the south.');
});

test('error is displayed when trying to move south when direction is invalid', () => {
  const world = new World();
  world.getRoom.mockImplementation(() => ({}));

  south.action({ world, terminal }, 'south');

  expect(world.setCurrentRoom.mock.calls.length).toEqual(0);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You cannot move in that direction.');
});

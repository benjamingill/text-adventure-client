import World from '../world';
import debug from './debug';

const terminal = { appendLine: jest.fn() };

afterEach(() => {
  jest.clearAllMocks();
});

test('entering \'debug\' matches pattern', () => {
  expect(JSON.stringify('debug'.match(debug.pattern))).toEqual(JSON.stringify(['debug', '']));
});

test('entering \'debug on\' matches pattern', () => {
  expect(JSON.stringify('debug on'.match(debug.pattern))).toEqual(JSON.stringify(['debug on', 'on']));
});

test('entering \'debug off\' matches pattern', () => {
  expect(JSON.stringify('debug off'.match(debug.pattern))).toEqual(JSON.stringify(['debug off', 'off']));
});

test('entering \'debug on\' enters debug mode', () => {
  const world = new World({ rooms: { 0: { name: 'test room' } } });
  debug.action({ world, terminal }, ['debug on', 'on']);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Debug mode on.');
  expect(world.getDebugMode()).toEqual(true);
});

test('entering \'debug off\' exit debug mode', () => {
  const world = new World({ rooms: { 0: { name: 'test room' } } });
  debug.action({ world, terminal }, ['debug off', 'off']);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Debug mode off.');
  expect(world.getDebugMode()).toEqual(false);
});

test('entering \'debug\' toggles debug mode from on to off', () => {
  const world = new World({ rooms: { 0: { name: 'test room' } } });
  world.setDebugMode(true);
  debug.action({ world, terminal }, ['debug', '']);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Debug mode off.');
  expect(world.getDebugMode()).toEqual(false);
});

test('entering \'debug\' toggles debug mode from off to on', () => {
  const world = new World({ rooms: { 0: { name: 'test room' } } });
  world.setDebugMode(false);
  debug.action({ world, terminal }, ['debug', '']);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Debug mode on.');
  expect(world.getDebugMode()).toEqual(true);
});

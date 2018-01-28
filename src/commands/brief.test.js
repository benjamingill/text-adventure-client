import World from '../world';
import brief from './brief';

const terminal = { appendLine: jest.fn() };

afterEach(() => {
  jest.clearAllMocks();
});

test('entering \'brief\' matches pattern', () => {
  expect(JSON.stringify('brief'.match(brief.pattern))).toEqual(JSON.stringify(['brief', '']));
});

test('entering \'brief on\' matches pattern', () => {
  expect(JSON.stringify('brief on'.match(brief.pattern))).toEqual(JSON.stringify(['brief on', 'on']));
});

test('entering \'brief off\' matches pattern', () => {
  expect(JSON.stringify('brief off'.match(brief.pattern))).toEqual(JSON.stringify(['brief off', 'off']));
});

test('entering \'brief on\' enters brief mode', () => {
  const world = new World({ rooms: { 0: { name: 'test room' } } });
  brief.action({ world, terminal }, ['brief on', 'on']);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Brief mode on.');
  expect(world.getBriefMode()).toEqual(true);
});

test('entering \'brief off\' exit brief mode', () => {
  const world = new World({ rooms: { 0: { name: 'test room' } } });
  brief.action({ world, terminal }, ['brief off', 'off']);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Brief mode off.');
  expect(world.getBriefMode()).toEqual(false);
});

test('entering \'brief\' toggles brief mode from on to off', () => {
  const world = new World({ rooms: { 0: { name: 'test room' } } });
  world.setBriefMode(true);
  brief.action({ world, terminal }, ['brief', '']);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Brief mode off.');
  expect(world.getBriefMode()).toEqual(false);
});

test('entering \'brief\' toggles brief mode from off to on', () => {
  const world = new World({ rooms: { 0: { name: 'test room' } } });
  world.setBriefMode(false);
  brief.action({ world, terminal }, ['brief', '']);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Brief mode on.');
  expect(world.getBriefMode()).toEqual(true);
});


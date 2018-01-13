import Player from './player';
import parse from './parser';
import commands from './commands';

jest.mock('./commands', () => [
  { pattern: /^north$/, action: jest.fn() },
  { pattern: /^take sword$/, action: jest.fn() },
  { pattern: /^take amulet from pouch in backpack$/, action: jest.fn() },
]);

test('handles a command when a know action is entered', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: jest.fn() } };

  const result = parse(container, 'north');

  expect(result).toEqual(true);
  expect(commands[0].action.mock.calls.length).toEqual(1);
});

test('gives message stating no action is available when an unknown action is entered', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: jest.fn() } };

  const result = parse(container, 'a;dkuvaerugb4ebi');

  expect(result).toEqual(false);
  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You cannot do that.');
});

test('does not process if there is a single ignorable word at the beginning of an input statement', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: jest.fn() } };

  const result = parse(container, 'at north');

  expect(result).toEqual(false);
});

test('does not process if there are multiple ignorable words at the beginning of an input statement', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: jest.fn() } };

  const result = parse(container, 'at the north');

  expect(result).toEqual(false);
});

test('does not process if there is an ignorable word at the end of an input statement', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: jest.fn() } };

  const result = parse(container, 'north at');

  expect(result).toEqual(false);
});

test('does not process if there are multiple ignorable word at the end of an input statement', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: jest.fn() } };

  const result = parse(container, 'north at the');

  expect(result).toEqual(false);
});

test('processes if there is a single ignorable word in the middle of an input statement', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: jest.fn() } };

  const result = parse(container, 'take the sword');

  expect(result).toEqual(true);
  expect(commands[1].action.mock.calls.length).toEqual(1);
});

test('does not process if there are multiple ignorable words in the middle of an input statement', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: jest.fn() } };

  const result = parse(container, 'take the at sword');

  expect(result).toEqual(false);
});

test('processes if there are multiple ignorable words in the middle of an input statement separated by non-ignorable words', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: jest.fn() } };

  const result = parse(container, 'take the amulet from the pouch in the backpack');

  expect(result).toEqual(true);
  expect(commands[2].action.mock.calls.length).toEqual(1);
});

test('does not process if there are multiple ignorable words in the middle of an input statement not separated by non-ignorable words', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: jest.fn() } };

  const result = parse(container, 'take the amulet from the at pouch in the backpack');

  expect(result).toEqual(false);
});

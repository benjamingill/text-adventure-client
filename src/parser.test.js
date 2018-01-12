import Player from './player';
import parse from './parser';

test('gives message stating no action is available when an unknown action is entered', () => {
  const player = new Player({ currentRoom: 1, score: 0, moves: 0 });
  const container = { player, terminal: { appendLine: jest.fn() } };

  parse(container, 'a;dkuvaerugb4ebi');

  expect(container.terminal.appendLine.mock.calls[0][0]).toEqual('You cannot do that.');
});

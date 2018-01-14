import Terminal from './terminal';

test('terminal renders a string with a prompt and a block cursor after it', () => {
  const renderInput = jest.fn();
  const terminal = new Terminal(renderInput, jest.fn());
  terminal.appendLine('hello, is this the krusty krab? no, this is patrick. hello, is this the krusty krab? nooo, this is patrick!');
  expect(renderInput.mock.calls[0][0]).toEqual('hello, is this the krusty krab? no, this is patrick. hello, is this the krusty krab? nooo, this is patrick!\n>\u00A0\u2588');
});

test('terminal renders a character code with a key is pressed', () => {
  const renderInput = jest.fn();
  const terminal = new Terminal(renderInput, jest.fn());
  terminal.appendLine('hello, is this the krusty krab?');
  terminal.handleKeyPress(80, 'p');
  expect(renderInput.mock.calls[0][0]).toEqual('hello, is this the krusty krab?\n>\u00A0\u2588');
  expect(renderInput.mock.calls[1][0]).toEqual('hello, is this the krusty krab?\n>\u00A0p\u2588');
});

test('pressing escape clears current input', () => {
  const renderInput = jest.fn();
  const terminal = new Terminal(renderInput, jest.fn());
  terminal.appendLine('hello, is this the krusty krab?');
  terminal.handleKeyPress(80, 'p');
  terminal.handleKeyPress(27, '');
  expect(renderInput.mock.calls[0][0]).toEqual('hello, is this the krusty krab?\n>\u00A0\u2588');
  expect(renderInput.mock.calls[1][0]).toEqual('hello, is this the krusty krab?\n>\u00A0p\u2588');
  expect(renderInput.mock.calls[2][0]).toEqual('hello, is this the krusty krab?\n>\u00A0\u2588');
});

test('pressing enter causes system to process input', () => {
  const processInput = jest.fn();
  const terminal = new Terminal(jest.fn(), processInput);
  terminal.handleKeyPress(80, 'p');
  terminal.handleKeyPress(81, 'q');
  terminal.handleKeyPress(82, 'r');
  terminal.handleKeyPress(83, 's');
  terminal.handleKeyPress(13, '');
  expect(processInput.mock.calls[0][0]).toEqual(terminal);
  expect(processInput.mock.calls[0][1]).toEqual('pqrs');
});

test('pressing backspace causes input to be removed', () => {
  const renderInput = jest.fn();
  const terminal = new Terminal(renderInput, jest.fn());
  terminal.handleKeyPress(80, 'p');
  terminal.handleKeyPress(81, 'q');
  terminal.handleKeyPress(8, '');
  expect(renderInput.mock.calls[0][0]).toEqual('>\u00A0p\u2588');
  expect(renderInput.mock.calls[1][0]).toEqual('>\u00A0pq\u2588');
  expect(renderInput.mock.calls[2][0]).toEqual('>\u00A0p\u2588');
});

test('displays error message on input processing error', () => {
  const renderInput = jest.fn();
  const processInput = () => { throw new Error('error: something went wrong'); };
  const terminal = new Terminal(renderInput, processInput);
  terminal.handleKeyPress(80, 'p');
  terminal.handleKeyPress(13, '');
  expect(renderInput.mock.calls[0][0]).toEqual('>\u00A0p\u2588');
  expect(renderInput.mock.calls[1][0]).toEqual('>\u00A0p\n>\u00A0\u2588');
  expect(renderInput.mock.calls[2][0]).toEqual('>\u00A0p\nerror: something went wrong\n>\u00A0\u2588');
});

test('togling cursor renders cursor correctly', () => {
  const renderInput = jest.fn();
  const terminal = new Terminal(renderInput, jest.fn());
  terminal.handleKeyPress(80, 'p');
  terminal.toggleCursor();
  expect(renderInput.mock.calls[0][0]).toEqual('>\u00A0p\u2588');
  expect(renderInput.mock.calls[1][0]).toEqual('>\u00A0p\u00A0');
});

test('appending undefined string results in error message', () => {
  const renderInput = jest.fn();
  const terminal = new Terminal(renderInput, jest.fn());
  terminal.appendLine(undefined);
  expect(renderInput.mock.calls[0][0]).toEqual('error: attempting to render undefined string\n>\u00A0\u2588');
});

test('handling unknown code results in false response', () => {
  const renderInput = jest.fn();
  const terminal = new Terminal(renderInput, jest.fn());
  expect(terminal.handleKeyPress(33456, '')).toEqual(false);
});

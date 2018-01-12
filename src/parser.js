import find from 'lodash/find';
import commands from './commands';

const isMatch = (command, input) => input.match(command.pattern);
const findCommand = input => find(commands, command => isMatch(command, input));

export default function (container, input) {
  const command = findCommand(input);
  return command
    ? command.action(container, input.match(command.pattern))
    : container.terminal.appendLine('You cannot do that.');
}

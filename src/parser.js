import _ from 'lodash';
import commands from './commands';

const wordsToIgnore = ['the', 'at', 'a'];

const isMatch = (command, input) => input.match(command.pattern);
const findCommand = input => _.find(commands, command => isMatch(command, input));

export default function (container, input) {
  const tokens = _.split(input, ' ');

  let i = 1;
  while (i < tokens.length - 1) {
    if (_.includes(wordsToIgnore, tokens[i])) {
      const beforeTokenIsValid = !_.includes(wordsToIgnore, tokens[i - 1]);
      const afterTokenIsValid = !_.includes(wordsToIgnore, tokens[i + 1]);
      if (beforeTokenIsValid && afterTokenIsValid) {
        tokens.splice(i, 1);
      } else {
        i += 1;
      }
    } else {
      i += 1;
    }
  }

  const command = findCommand(_.join(tokens, ' '));
  if (command) {
    command.action(container, input.match(command.pattern));
    return true;
  }

  container.terminal.appendLine('You cannot do that.');
  container.terminal.appendLine('');
  return false;
}

import _ from 'lodash';
import { fromAbbreviations, toAbbreviations } from '../directions';

const action = ({ world, terminal }, matches) => {
  const itemToken = matches[1];
  const directionToken = matches[2];

  const items = world.findItemsInRoom(world.getCurrentRoom());
  if (_.isEmpty(items)) {
    terminal.appendLine(`You do not see a ${itemToken} here.`);
    return;
  }

  let direction = fromAbbreviations(directionToken);

  if (!direction) {
    direction = toAbbreviations(directionToken);
  }

  if (!direction) {
    terminal.appendLine(`I do not understand the direction '${directionToken}'.`);
  }

  if (_.size(items) > 1) {
    if (_.size(items) === 2) {
      terminal.appendLine(`Do you want to push the ${items[0].name} or the ${items[1].name}?`);
    } else {
      const names = _.map(items, i => i.name);
      const lastName = _.last(names);
      terminal.appendLine(`Do you want to push the ${_.join(_.dropRight(names), ', ')} or the ${lastName}?`);
    }
    return;
  }

  const item = items[0];
  if (!item.canPush) {
    terminal.appendLine(`You can not push the ${item.name}.`);
  }
  terminal.appendLine(`What direction do you want to push the ${item.name}?`);
};

export default {
  pattern: /^push\s+([\w\s]+)\s+([\w\s]+)$/,
  action,
};

import _ from 'lodash';

const action = ({ world, terminal }, matches) => {
  const items = world.findItemsInRoom(world.getCurrentRoom());
  if (_.isEmpty(items)) {
    terminal.appendLine(`You do not see a ${matches[1]} here.`);
    return;
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
  pattern: /^push\s+([\w\s]+)$/,
  action,
};

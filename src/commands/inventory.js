import _ from 'lodash';

const action = ({ world, terminal }) => {
  const items = world.getItemsFromInventory();
  terminal.appendLine('You are carrying:');
  if (_.size(items) === 0) {
    terminal.appendLine('  nothing');
  } else {
    _.forEach(items, i => terminal.appendLine(`  ${i.inventoryDescription}`));
  }
  terminal.appendLine('');
};

export default {
  pattern: /^i$|^inventory$/,
  action,
};

import _ from 'lodash';

const action = ({ world, terminal }, match) => {
  const currentRoom = world.getCurrentRoom();

  const handleItemsFoundInInventory = (items) => {
    if (_.size(items) > 1) {
      terminal.appendLine(`You are already holding a number of items that fit the description of '${match[1]}'.`);
    } else {
      terminal.appendLine(`You are already holding the ${items[0].name}!`);
    }
  };

  const handleItemsFoundInRoom = (items) => {
    if (_.size(items) > 1) {
      if (_.size(items) === 2) {
        terminal.appendLine(`Do you mean the ${items[0].name} or the ${items[1].name}?`);
      } else {
        const lastItem = items.pop();
        terminal.appendLine(`Do you mean the ${_.join(_.map(items, i => i.name), ', ')} or the ${lastItem.name}?`);
      }
    } else {
      world.removeItemFromRoom(currentRoom, items[0].id);
      world.addItemToInventory(items[0].id);
      terminal.appendLine(`You take the ${items[0].name}`);
    }
  };

  if (typeof match[1] === 'undefined') {
    terminal.appendLine('Take what?');
  } else {
    const itemsInRoom = world.findItemsInRoom(currentRoom, match[1]);
    if (_.size(itemsInRoom)) {
      handleItemsFoundInRoom(itemsInRoom);
    } else {
      const itemsInInventory = world.findItemsInInventory(match[1]);
      if (_.size(itemsInInventory)) {
        handleItemsFoundInInventory(itemsInInventory);
      } else {
        terminal.appendLine(`You do not see a ${match[1]} here.`);
      }
    }
  }
  terminal.appendLine('');
};

export default {
  pattern: /^take$|^take\s+([\w\s]+)$/,
  action,
};

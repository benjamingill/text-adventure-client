import _ from 'lodash';

const action = ({ world, terminal }, match) => {
  const currentRoom = world.getCurrentRoom();

  const handleItemsFoundInInventory = (items) => {
    if (_.size(items) > 1) {
      if (_.size(items) === 2) {
        terminal.appendLine(`Do you mean the ${items[0].name} or the ${items[1].name}?`);
      } else {
        const lastItem = items.pop();
        terminal.appendLine(`Do you mean the ${_.join(_.map(items, i => i.name), ', the ')} or the ${lastItem.name}?`);
      }
    } else {
      world.removeItemFromInventory(items[0].id);
      world.addItemToRoom(currentRoom, items[0].id);
      terminal.appendLine(`You drop the ${items[0].name}.`);
    }
  };

  const handleItemsFoundInRoom = (items) => {
    if (_.size(items) > 1) {
      terminal.appendLine('You see items here that match that description but you are not holding any of them.');
    } else {
      terminal.appendLine(`You are not currently holding the ${items[0].name}.`);
    }
  };

  if (typeof match[1] === 'undefined') {
    terminal.appendLine('Drop what?');
  } else {
    const itemsInInventory = world.findItemsInInventory(match[1]);
    if (_.size(itemsInInventory)) {
      handleItemsFoundInInventory(itemsInInventory);
    } else {
      const itemsInRoom = world.findItemsInRoom(currentRoom, match[1]);
      if (_.size(itemsInRoom)) {
        handleItemsFoundInRoom(itemsInRoom);
      } else {
        terminal.appendLine(`You are not holding a ${match[1]}.`);
      }
    }
  }
  terminal.appendLine('');
};

export default {
  pattern: /^drop$|^drop\s([\w\s]+)$/,
  action,
};

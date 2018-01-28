import _ from 'lodash';
import { fromAbbreviations } from '../directions';

const action = ({ world, terminal }) => {
  const displayItemInInventory = (item) => {
    terminal.appendLine(`  ${item.inventoryDescription}`);
  };

  const displayItemInRoom = (item) => {
    if (item.isContainer && item.canClose && item.isClosed) {
      terminal.appendLine(`${item.shortDescription} (closed)`);
    } else if (item.isContainer && item.canClose && !item.isClosed) {
      terminal.appendLine(`${item.shortDescription} (opened)`);
    } else {
      terminal.appendLine(item.shortDescription);
    }

    const subItems = world.getItemsFromItem(item.id);
    if (item.isContainer && !item.isClosed && _.size(subItems) === 0) {
      terminal.appendLine(`The ${item.name} contains:`);
      terminal.appendLine('  nothing');
    }

    if (item.isContainer && !item.isClosed && _.size(subItems) > 0) {
      terminal.appendLine(`The ${item.name} contains:`);
      _.forEach(subItems, displayItemInInventory);
    }
  };

  const room = world.getRoom(world.getCurrentRoom());
  if (world.getDebugMode()) {
    terminal.appendLine(`[${room.id}] ${room.name}`);
  } else {
    terminal.appendLine(room.name);
  }

  if (!world.getBriefMode()) {
    terminal.appendLine(room.description);
  }

  if (_.size(room.exits) === 0) {
    terminal.appendLine('[none]');
  } else if (world.getDebugMode()) {
    const directions = _(room.exits).keys().map(key => `${key}:${room.exits[key]}`).value();
    terminal.appendLine(`[${_.join(directions, ', ')}]`);
  } else {
    let directions = _.keys(room.exits);
    if (!world.getBriefMode()) {
      directions = _.map(directions, fromAbbreviations);
    }
    terminal.appendLine(`[${_.join(directions, ', ')}]`);
  }

  terminal.appendLine('');

  const items = world.getItemsFromRoom(room.id);
  if (_.size(items)) {
    _.forEach(items, displayItemInRoom);
    terminal.appendLine('');
  }
};

export default {
  pattern: /^l$|^look$/,
  action,
};

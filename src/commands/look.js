import _ from 'lodash';
import { fromAbbreviations } from '../directions';

const action = ({ player, rooms, terminal }) => {
  const displayItemInInventory = (item) => {
    terminal.appendLine(` ${item.inventoryDescription}`);
  };

  const displayItemInRoom = (item) => {
    if (item.isContainer && item.canClose && item.isClosed) {
      terminal.appendLine(`${item.shortDescription} (closed)`);
    } else if (item.isContainer && item.canClose && !item.isClosed) {
      terminal.appendLine(`${item.shortDescription} (opened)`);
    } else {
      terminal.appendLine(item.shortDescription);
    }

    if (item.isContainer && !item.isClosed && _.size(item.container) === 0) {
      terminal.appendLine(`The ${item.name} contains:`);
      terminal.appendLine(' nothing');
    }

    if (item.isContainer && !item.isClosed && _.size(item.container) > 0) {
      terminal.appendLine(`The ${item.name} contains:`);
      _.forEach(item.container, displayItemInInventory);
      terminal.appendLine('');
    }
  };

  const room = rooms[player.getCurrentRoom()];
  terminal.appendLine(room.name);

  if (!player.getIsBriefMode()) {
    terminal.appendLine(room.description);
  }

  if (_.size(room.exits) === 0) {
    terminal.appendLine('[none]');
  } else {
    let directions = _.keys(room.exits);
    if (!player.getIsBriefMode()) {
      directions = _.map(directions, fromAbbreviations);
    }
    terminal.appendLine(`[${_.join(directions, ', ')}]`);
  }

  terminal.appendLine('');

  if (_.size(room.container)) {
    _.forEach(room.container, displayItemInRoom);
    terminal.appendLine('');
  }
};

export default {
  pattern: /^l$|^look$/,
  action,
};

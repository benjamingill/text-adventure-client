import _ from 'lodash';
import { fromAbbreviations } from '../directions';

const action = ({ player, rooms, terminal }) => {
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
};

export default {
  pattern: /^l$|^look$/,
  action,
};

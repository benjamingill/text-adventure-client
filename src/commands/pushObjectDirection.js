import _ from 'lodash';
import look from './look';
import { getLongFormat, getShortFormat } from '../directions';

const action = ({ world, terminal }, matches) => {
  const itemToken = matches[1];
  const directionToken = matches[2];

  const currentRoom = world.getCurrentRoom;
  const items = world.findItemsInRoom(currentRoom);
  if (_.isEmpty(items)) {
    terminal.appendLine(`You do not see a ${itemToken} here.`);
    return;
  }

  const direction = getShortFormat(directionToken);
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
    return;
  }

  const nextRoomNumber = world.getExitRoomNumber(direction);
  if (typeof nextRoomNumber === 'undefined') {
    terminal.appendLine(`You can not push the ${item.name} to the ${getLongFormat(direction)}.`);
    return;
  }

  world.removeItemFromRoom(currentRoom, item.id);
  world.addItemToRoom(nextRoomNumber, items[0].id);

  world.setCurrentRoom(nextRoomNumber);

  terminal.appendLine(`You push the ${item.name} to the ${getLongFormat(direction)}.`);
  terminal.appendLine('');

  look.action({ world, terminal });
};

export default {
  pattern: /^push\s+([\w\s]+)\s+([\w\s]+)$/,
  action,
};

import get from 'lodash/get';
import look from './look';

const action = ({ player, world, terminal }) => {
  const room = world.getRoom(player.getCurrentRoom());
  const id = get(room, 'exits.w');
  if (id) {
    player.setCurrentRoom(id);
    terminal.appendLine('You move to the west.');
    terminal.appendLine('');
    look.action({ player, world, terminal });
  } else {
    terminal.appendLine('You cannot move in that direction.');
    terminal.appendLine('');
  }
};

export default {
  pattern: /^w$|^west$/,
  action,
};

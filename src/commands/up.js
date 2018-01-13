import get from 'lodash/get';
import look from './look';

const action = ({ player, rooms, terminal }) => {
  const room = rooms[player.getCurrentRoom()];
  const id = get(room, 'exits.u');
  if (id) {
    player.setCurrentRoom(id);
    terminal.appendLine('You move up.');
    terminal.appendLine('');
    look.action({ player, rooms, terminal });
  } else {
    terminal.appendLine('You cannot move up.');
    terminal.appendLine('');
  }
};

export default {
  pattern: /^u$|^up$/,
  action,
};

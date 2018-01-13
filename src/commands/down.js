import get from 'lodash/get';
import look from './look';

const action = ({ player, rooms, terminal }) => {
  const room = rooms[player.getCurrentRoom()];
  const id = get(room, 'exits.d');
  if (id) {
    player.setCurrentRoom(id);
    terminal.appendLine('You move down.');
    terminal.appendLine('');
    look.action({ player, rooms, terminal });
  } else {
    terminal.appendLine('You cannot move down.');
    terminal.appendLine('');
  }
};

export default {
  pattern: /^d$|^down$/,
  action,
};

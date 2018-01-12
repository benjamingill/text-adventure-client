import get from 'lodash/get';

const action = ({ player, rooms, terminal }) => {
  const room = rooms[player.getCurrentRoom()];
  const id = get(room, 'exits.d');
  if (id) {
    player.setCurrentRoom(id);
    terminal.appendLine('You move down.');
  } else {
    terminal.appendLine('You cannot move down.');
  }
};

export default {
  pattern: /^d$|^down$/,
  action,
};

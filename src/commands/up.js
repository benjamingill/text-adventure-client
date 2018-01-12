import get from 'lodash/get';

const action = ({ player, rooms, terminal }) => {
  const room = rooms[player.getCurrentRoom()];
  const id = get(room, 'exits.u');
  if (id) {
    player.setCurrentRoom(id);
    terminal.appendLine('You move up.');
  } else {
    terminal.appendLine('You cannot move up.');
  }
};

export default {
  pattern: /^u$|^up$/,
  action,
};

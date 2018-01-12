import get from 'lodash/get';

const action = ({ player, rooms, terminal }) => {
  const room = rooms[player.getCurrentRoom()];
  const id = get(room, 'exits.e');
  if (id) {
    player.setCurrentRoom(id);
    terminal.appendLine('You move to the east.');
  } else {
    terminal.appendLine('You cannot move that direction.');
  }
};

export default {
  pattern: /^e$|^east$/,
  action,
};

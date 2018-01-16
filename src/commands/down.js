import get from 'lodash/get';
import look from './look';

const action = ({ world, terminal }) => {
  const room = world.getRoom(world.getCurrentRoom());
  const id = get(room, 'exits.d');
  if (id) {
    world.setCurrentRoom(id);
    terminal.appendLine('You move down.');
    terminal.appendLine('');
    look.action({ world, terminal });
  } else {
    terminal.appendLine('You cannot move down.');
    terminal.appendLine('');
  }
};

export default {
  pattern: /^d$|^down$/,
  action,
};

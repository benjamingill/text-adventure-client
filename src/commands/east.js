import get from 'lodash/get';
import look from './look';

const action = ({ world, terminal }) => {
  const room = world.getRoom(world.getCurrentRoom());
  const id = get(room, 'exits.e');
  if (id) {
    world.setCurrentRoom(id);
    terminal.appendLine('You move to the east.');
    terminal.appendLine('');
    look.action({ world, terminal });
  } else {
    terminal.appendLine('You cannot move in that direction.');
    terminal.appendLine('');
  }
};

export default {
  pattern: /^e$|^east$/,
  action,
};

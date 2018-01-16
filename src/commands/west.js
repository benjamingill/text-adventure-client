import get from 'lodash/get';
import look from './look';

const action = ({ world, terminal }) => {
  const room = world.getRoom(world.getCurrentRoom());
  const id = get(room, 'exits.w');
  if (id) {
    world.setCurrentRoom(id);
    terminal.appendLine('You move to the west.');
    terminal.appendLine('');
    look.action({ world, terminal });
  } else {
    terminal.appendLine('You cannot move in that direction.');
    terminal.appendLine('');
  }
};

export default {
  pattern: /^w$|^west$/,
  action,
};

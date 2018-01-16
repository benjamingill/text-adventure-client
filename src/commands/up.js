import get from 'lodash/get';
import look from './look';

const action = ({ world, terminal }) => {
  const room = world.getRoom(world.getCurrentRoom());
  const id = get(room, 'exits.u');
  if (id) {
    world.setCurrentRoom(id);
    terminal.appendLine('You move up.');
    terminal.appendLine('');
    look.action({ world, terminal });
  } else {
    terminal.appendLine('You cannot move up.');
    terminal.appendLine('');
  }
};

export default {
  pattern: /^u$|^up$/,
  action,
};

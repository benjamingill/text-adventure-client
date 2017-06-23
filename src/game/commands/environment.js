import * as actions from '../actions';
import { getRoomDescription } from '../room';

export const look = {
  command: 'look',
  pattern: new RegExp(/^(l|look)$/i),
  action: (state, dispatch) => {
    dispatch(actions.output(getRoomDescription(state.currentRoom, state.options)));
  },
};

export const lookAt = {
  command: 'lookAt',
  pattern: new RegExp(/^(l|look at (.+))$/i),
  action: (state, dispatch, groups) => {
    dispatch(actions.output(`You don't see a ${groups[2]} here.\n`));
  },
};

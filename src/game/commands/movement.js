import * as actions from '../actions';
import { directionAbbreviations } from '../game';
import { currentRoomDescription } from '../room';

const canMoveInDirection = (area, direction) => direction in area.exits;

const move = (state, dispatch, input, direction) => {
  const directionAbbr = directionAbbreviations[direction];
  const area = state.world[state.currentRoom];

  if (canMoveInDirection(area, directionAbbr)) {
    const exitRoomId = area.exits[directionAbbr];
    const newState = Object.assign({}, state, { currentRoom: exitRoomId });
    dispatch(actions.game(newState));
    dispatch(actions.output(`You move ${direction}.\n\n`));
    dispatch(actions.output(currentRoomDescription(newState)));
  } else {
    dispatch(actions.output(`You cannot go ${direction}.\n`));
  }
};

export const north = {
  command: 'north',
  pattern: new RegExp(/^(n|north)$/i),
  action: (state, dispatch, input) => move(state, dispatch, input, 'north'),
};

export const south = {
  command: 'south',
  pattern: new RegExp(/^(s|south)$/i),
  action: (state, dispatch, input) => move(state, dispatch, input, 'south'),
};

export const east = {
  command: 'east',
  pattern: new RegExp(/^(e|east)$/i),
  action: (state, dispatch, input) => move(state, dispatch, input, 'east'),
};

export const west = {
  command: 'west',
  pattern: new RegExp(/^(w|west)$/i),
  action: (state, dispatch, input) => move(state, dispatch, input, 'west'),
};

export const up = {
  command: 'up',
  pattern: new RegExp(/^(u|up)$/i),
  action: (state, dispatch, input) => move(state, dispatch, input, 'up'),
};

export const down = {
  command: 'down',
  pattern: new RegExp(/^(d|down)$/i),
  action: (state, dispatch, input) => move(state, dispatch, input, 'down'),
};

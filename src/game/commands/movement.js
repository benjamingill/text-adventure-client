import * as actions from '../actions';
import { directionAbbreviations } from '../game';
import { getRoom, getRoomDescription } from '../room';

const canMoveInDirection = (room, direction) => direction in room.exits;

const move = (state, dispatch, input, direction) => {
  const room = getRoom(state.currentRoom);
  const directionAbbr = directionAbbreviations[direction];
  const canMove = canMoveInDirection(room, directionAbbr);
  const newState = canMove
    ? Object.assign({}, state, { currentRoom: room.exits[directionAbbr] })
    : state;
  dispatch(actions.game(newState));
  const response = canMove
    ? `You move ${direction}.\n\n${getRoomDescription(newState.currentRoom, state.options)}`
    : `You cannot go ${direction}.\n`;
  dispatch(actions.output(response));
  return newState;
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

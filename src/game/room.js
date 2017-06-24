import StringBuilder from 'string-builder';
import { directions } from './game';
import * as utils from './utils';
import rooms from '../data/rooms.yaml';

const getExitDescription = (exit, roomId, options) => {
  const direction = (utils.isBrief(options) ? exit : directions[exit]);
  return utils.isDebug(options) ? `${direction}:${roomId}` : direction;
};

const getExitsDescription = (exits, options) => {
  const keys = Object.keys(exits);
  return keys.length
    ? `[${keys.map(e => getExitDescription(e, exits[e], options)).join(', ')}]`
    : '[none]';
};

export const currentRoomId = state =>
  (state.world[state.currentRoom]
    ? state.world[state.currentRoom].id
    : 0);

export const currentRoom = state =>
  rooms[currentRoomId(state)];

export function currentRoomDescription(state) {
  const area = state.world[state.currentRoom] || state.world[0];
  const room = rooms[area.id];

  const sb = new StringBuilder();
  if (utils.isDebug(state.options)) {
    sb.append(area.id);
    sb.append(': ');
  }

  sb.append(room.name);
  sb.append('\n');
  if (!utils.isBrief(state.options)) {
    sb.append(room.description);
    sb.append('\n');
  }

  sb.append(getExitsDescription(area.exits || {}, state.options));
  sb.append('\n');
  return sb.toString();
}


import StringBuilder from 'string-builder';
import { directions } from './game';
import rooms from '../data/rooms.yaml';

const getExitDescription = (exit, roomId, options) => {
  const direction = (options && options.brief ? exit : directions[exit]);
  return options.debug ? `${direction}:${roomId}` : direction;
};

const getExitsDescription = (exits, options) => (
  (exits && Object.keys(exits).length)
    ? `[${Object.keys(exits).map(e => getExitDescription(e, exits[e], options)).join(', ')}]`
    : '[none]');

export function getRoom(id) {
  return rooms[id];
}

export function getName(room) {
  return room ? room.name : 'Limbo';
}

export function getRoomDescription(id, options) {
  const room = getRoom(id);
  const sb = new StringBuilder();
  if (options && options.debug) {
    sb.append(id);
    sb.append(': ');
  }

  sb.append(room.name);
  sb.append('\n');
  if (!(options && options.brief)) {
    sb.append(room.description);
    sb.append('\n');
  }

  sb.append(getExitsDescription(room.exits, options));
  sb.append('\n');
  return sb.toString();
}

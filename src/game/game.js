import commands from './commands/';
import world from '../data/world.yaml';

const isMatch = (command, input) => input.match(command.pattern);
const findCommand = input => commands.find(a => isMatch(a, input));

export const intro = '\n\u00A0\u00A0Welcome to SWEET TEXT ADVENTURE!\n\u00A0\u00A0(c) 1982 Some Ficticious Company\n\n';
export const prompt = '> ';
export const initialState = {
  currentRoom: 1,
  moves: 0,
  score: 0,
  options: {
    debug: false,
    brief: false,
  },
  world,
};

export const directions = {
  n: 'north',
  s: 'south',
  e: 'east',
  w: 'west',
  u: 'up',
  d: 'down',
};

export const directionAbbreviations = {
  north: 'n',
  south: 's',
  east: 'e',
  west: 'w',
  up: 'u',
  down: 'd',
};

export function parse(state, dispatch, input) {
  const command = findCommand(input);
  return command
    ? command.action(state, dispatch, input.match(command.pattern))
    : state;
}

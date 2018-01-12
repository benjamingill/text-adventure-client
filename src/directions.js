import invert from 'lodash/invert';

const directions = {
  n: 'north',
  s: 'south',
  e: 'east',
  w: 'west',
  u: 'up',
  d: 'down',
};

export function fromAbbreviations(abbv) {
  return directions[abbv];
}

export function toAbbreviations(direction) {
  return invert(directions)[direction];
}

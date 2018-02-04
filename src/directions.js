import _ from 'lodash';
import invert from 'lodash/invert';

const directions = {
  n: 'north',
  s: 'south',
  e: 'east',
  w: 'west',
  u: 'up',
  d: 'down',
};

export const fromAbbreviations = abbv => directions[abbv];

export const toAbbreviations = direction => invert(directions)[direction];

export const getLongFormat = direction =>
  (_.chain(directions).values().find(direction).value()
    ? direction
    : fromAbbreviations(direction));

export const getShortFormat = direction =>
  (_.chain(directions).keys().find(direction).value()
    ? direction
    : toAbbreviations(direction));

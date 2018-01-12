import * as directions from './directions';

test('converts abbreviation for n to north', () => {
  expect(directions.fromAbbreviations('n')).toEqual('north');
});

test('converts direction for north to abbreviation n', () => {
  expect(directions.toAbbreviations('north')).toEqual('n');
});

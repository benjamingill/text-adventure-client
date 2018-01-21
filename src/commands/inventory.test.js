import inventory from './inventory';
import World from '../world';

jest.mock('../world');

const terminal = { appendLine: jest.fn() };
const world = new World();

afterEach(() => {
  jest.clearAllMocks();
});

test('inventory is shown when user types \'inventory\'', () => {
  world.getItemsFromInventory.mockImplementation(() => [{ id: 0, name: 'iron dagger', inventoryDescription: 'an iron dagger' }]);
  inventory.action({ world, terminal }, ['inventory']);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You are carrying:');
  expect(terminal.appendLine.mock.calls[1][0]).toEqual('  an iron dagger');
});

test('inventory is shown when user types \'i\'', () => {
  world.getItemsFromInventory.mockImplementation(() => [{ id: 0, name: 'iron dagger', inventoryDescription: 'an iron dagger' }]);
  inventory.action({ world, terminal }, ['i']);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You are carrying:');
  expect(terminal.appendLine.mock.calls[1][0]).toEqual('  an iron dagger');
});

test('inventory can show multiple items if multiple items exist', () => {
  world.getItemsFromInventory.mockImplementation(() => [
    { id: 0, name: 'iron dagger', inventoryDescription: 'an iron dagger' },
    { id: 1, name: 'brass lantern', inventoryDescription: 'a brass lantern' },
  ]);
  inventory.action({ world, terminal }, ['i']);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You are carrying:');
  expect(terminal.appendLine.mock.calls[1][0]).toEqual('  an iron dagger');
  expect(terminal.appendLine.mock.calls[2][0]).toEqual('  a brass lantern');
});

test('inventory is shown as empty when no items exist', () => {
  world.getItemsFromInventory.mockImplementation(() => []);
  inventory.action({ world, terminal }, ['i']);
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('You are carrying:');
  expect(terminal.appendLine.mock.calls[1][0]).toEqual('  nothing');
});

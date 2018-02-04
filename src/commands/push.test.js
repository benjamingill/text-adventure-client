import push from './push';
import World from '../world';
import Terminal from '../terminal';

jest.mock('../world');
jest.mock('../terminal');

const world = new World();
const terminal = new Terminal();

test('\'push\' matches pattern', () => {
  expect(JSON.stringify('push'.match(push.pattern))).toEqual(JSON.stringify(['push']));
});

test('garbage doesn\'t match pattern', () => {
  expect('dfgdfgdfg'.match(push.pattern)).toEqual(null);
});

test('\'push\' results in warning', () => {
  push.action({ world, terminal }, 'push'.match(push.pattern));
  expect(terminal.appendLine.mock.calls[0][0]).toEqual('Push what?');
});

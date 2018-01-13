import _ from 'lodash';
import rooms from './data/rooms.yaml';
import items from './data/items.yaml';
import world from './data/world.yaml';

const constructItem = (template) => {
  const item = _.cloneDeep(items[template.id]);
  item.container = _.map(template.items, constructItem);
  return item;
};

const constructRoom = (template) => {
  const room = _.cloneDeep(rooms[template.room]);
  room.id = template.room;
  room.container = _.map(template.items, constructItem);
  return room;
};

export default _.chain(world).map(constructRoom).keyBy('id').value();

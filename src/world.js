import _ from 'lodash';
import roomData from './data/rooms.yaml';
import itemData from './data/items.yaml';
import mobData from './data/mobs.yaml';
import worldData from './data/world.yaml';

_.forEach(_.keys(itemData), (key) => { itemData[key].id = key; });
_.forEach(_.keys(mobData), (key) => { mobData[key].id = key; });
_.forEach(_.keys(roomData), (key) => { roomData[key].id = key; });

const createWorld = () => {
  const world = {
    rooms: {},
    items: {},
    mobs: {},
  };

  const createItem = (item) => {
    const { id, items } = item;
    const ids = _.map(items, createItem);
    world.items[id] = { items: ids };
    return id;
  };

  const createRoom = (room) => {
    const { id, items } = room;
    const ids = _.map(items, createItem);
    world.rooms[id] = { items: ids };
    return id;
  };

  _.forEach(worldData, createRoom);
  return world;
};

export default function World() {
  const processedWorldData = (() => {
    if (!localStorage.getItem('world')) {
      localStorage.setItem('world', JSON.stringify(createWorld()));
    }
    return JSON.parse(localStorage.getItem('world'));
  })();

  this.map = processedWorldData;
  this.rooms = roomData;

  this.getItem = id => itemData[id];

  this.getItemsFromItem = (id) => {
    const ids = this.map.items[id] && this.map.items[id].items;
    return _.map(ids, this.getItem);
  };

  this.getItemsFromRoom = (id) => {
    const ids = this.map.rooms[id] && this.map.rooms[id].items;
    return _.map(ids, this.getItem);
  };

  this.getRoom = id => roomData[id];
}

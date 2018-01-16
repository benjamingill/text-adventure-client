import _ from 'lodash';
import roomData from './data/rooms.yaml';
import itemData from './data/items.yaml';
import mobData from './data/mobs.yaml';
import mapData from './data/map.yaml';

_.forEach(_.keys(itemData), (key) => { itemData[key].id = key; });
_.forEach(_.keys(mobData), (key) => { mobData[key].id = key; });
_.forEach(_.keys(roomData), (key) => { roomData[key].id = key; });

const worldData = {
  rooms: roomData,
  items: itemData,
  map: mapData,
};


const createWorld = (data) => {
  const world = {
    inv: data.inv || [],
    items: {},
    mobs: {},
    rooms: {},
  };

  const createItem = (item) => {
    const { id, items } = item;
    world.items[id] = { items: _.map(items, createItem) };
    return id;
  };

  const createRoom = (room) => {
    const { id, items } = room;
    world.rooms[id] = { items: _.map(items, createItem) };
    return id;
  };

  _.forEach(data.map, createRoom);
  return world;
};

export default function World(data = worldData) {
  const world = (() => {
    if (!localStorage.getItem('world')) {
      localStorage.setItem('world', JSON.stringify(createWorld(data)));
    }
    return JSON.parse(localStorage.getItem('world'));
  })();

  this.addItemToInventory = (id) => {
    if (!_.size(_.filter(world.inv, i => i === id))) {
      world.inv.push(id);
    }
  };

  this.findItemsInInventory = token =>
    _.chain(this.getItemsFromInventory())
      .filter(i => i && _.includes(i.keywords, token))
      .value();


  this.findItemsInItem = (id, token) =>
    _.chain(this.getItemsFromItem(id))
      .filter(i => i && _.includes(i.keywords, token))
      .value();

  this.findItemsInRoom = (id, token) =>
    _.chain(this.getItemsFromRoom(id))
      .filter(i => i && _.includes(i.keywords, token))
      .value();

  this.getItem = id => data.items[id];

  this.getItemsFromItem = (id) => {
    const ids = world.items[id] && world.items[id].items;
    return _.map(ids, this.getItem);
  };

  this.getItemsFromRoom = (id) => {
    const ids = world.rooms[id] && world.rooms[id].items;
    return _.map(ids, this.getItem);
  };

  this.getItemsFromInventory = () =>
    _.map(world.inv, this.getItem);

  this.getRoom = id => data.rooms[id];

  this.removeItemFromRoom = (roomId, itemId) => {
    const room = world.rooms[roomId];
    const index = room.items.indexOf(itemId);
    room.items.splice(index, 1);
  };

  this.save = () => localStorage.setItem('world', JSON.stringify(world));
}

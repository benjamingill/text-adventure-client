import _ from 'lodash';
import roomData from './data/rooms.yaml';
import itemData from './data/items.yaml';
import mobData from './data/mobs.yaml';
import mapData from './data/map.yaml';

const startingRoom = 4;

const createWorld = (data) => {
  const state = {
    currentRoom: data.currentRoom || startingRoom,
    inv: data.inv || [],
    items: {},
    mobs: {},
    moves: 0,
    options: {
      brief: false,
      debug: false,
    },
    rooms: {},
    score: 0,
  };

  const createItem = (item) => {
    const { id, items } = item;
    state.items[id] = { items: _.map(items, createItem) };
    return id;
  };

  const createRoom = (room) => {
    const { id, items } = room;
    state.rooms[id] = { items: _.map(items, createItem) };
    return id;
  };

  _.forEach(data.map, createRoom);
  return state;
};

const worldData = {
  rooms: _.keyBy(roomData, o => o.id),
  items: _.keyBy(itemData, o => o.id),
  mobs: _.keyBy(mobData, o => o.id),
  map: mapData,
};

const getLocalStorage = key => JSON.parse(localStorage.getItem(key));
const setLocalStorage = (key, object) => localStorage.setItem(key, JSON.stringify(object));

export default function World(data = worldData) {
  const state = (() => getLocalStorage('text-adventure:worldStore') || createWorld(data))();

  this.addItemToInventory = (id) => {
    if (typeof _.find(state.inv, i => i === id) === 'undefined') {
      state.inv.push(id);
    }
  };

  this.addItemToRoom = (roomId, itemId) => {
    if (typeof state.rooms[roomId] === 'undefined') {
      state.rooms[roomId] = { items: [] };
    }
    const { items } = state.rooms[roomId];
    if (typeof _.find(items, i => i === itemId) === 'undefined') {
      items.push(itemId);
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
    const ids = state.items[id] && state.items[id].items;
    return _.map(ids, this.getItem);
  };

  this.getItemsFromRoom = (id) => {
    const ids = state.rooms[id] && state.rooms[id].items;
    return _.map(ids, this.getItem);
  };

  this.getCurrentRoom = () => state.currentRoom;

  this.getScore = () => state.score;

  this.getMoves = () => state.moves;

  this.getOptions = () => state.options;

  this.getItemsFromInventory = () => _.map(state.inv, this.getItem);

  this.getRoom = id => data.rooms[id];

  this.removeItemFromInventory = (itemId) => {
    state.inv = _.filter(state.inv, i => i !== itemId);
  };

  this.removeItemFromRoom = (roomId, itemId) => {
    const room = state.rooms[roomId];
    const index = room.items.indexOf(itemId);
    room.items.splice(index, 1);
  };

  this.save = () => setLocalStorage('text-adventure:worldStore', state);

  this.saveUnhandledCommand = (command) => {
    const commandStore = getLocalStorage('text-adventure:commandStore') || [];
    commandStore.push(command);
    setLocalStorage('text-adventure:commandStore', commandStore);
  };

  this.setCurrentRoom = (id) => { state.currentRoom = id; };
}

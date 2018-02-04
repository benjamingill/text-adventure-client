import _ from 'lodash';
import roomData from './data/rooms.yaml';
import itemData from './data/items.yaml';
import mobData from './data/mobs.yaml';
import mapData from './data/map.yaml';
import { fromAbbreviations, toAbbreviations } from './directions';

const startingRoom = 4;

const createWorld = (data) => {
  const currentRoom = (typeof data.currentRoom !== 'undefined') ? data.currentRoom : startingRoom;
  const state = {
    currentRoom,
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

  this.addItemToInventory = (itemId) => {
    if (typeof _.find(state.inv, i => i === itemId) === 'undefined') {
      state.inv.push(itemId);
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

  this.getExitRoomNumber = (direction) => {
    let directionKey = direction;
    if (toAbbreviations(direction)) {
      directionKey = toAbbreviations(direction);
    }
    const currentRoom = this.getRoom(this.getCurrentRoom());
    return currentRoom.exits[directionKey];
  };

  this.findItemsInInventory = token =>
    _.chain(this.getItemsFromInventory())
      .filter(i => i && _.includes(i.keywords, token))
      .value();


  this.findItemsInContainer = (containerId, token) =>
    _.chain(this.getItemsFromContainer(containerId))
      .filter(i => i && _.includes(i.keywords, token))
      .value();

  this.findItemsInRoom = (roomId, token) =>
    _.chain(this.getItemsFromRoom(roomId))
      .filter(i => i && _.includes(i.keywords, token))
      .value();

  this.getItem = itemId => data.items[itemId];

  this.getItemsFromContainer = (containerId) => {
    const ids = state.items[containerId] && state.items[containerId].items;
    return _.map(ids, this.getItem);
  };

  this.getItemsFromRoom = (roomId) => {
    const ids = state.rooms[roomId] && state.rooms[roomId].items;
    return _.map(ids, this.getItem);
  };

  this.getBriefMode = () => state.options.brief;

  this.getCurrentRoom = () => state.currentRoom;

  this.getDebugMode = () => state.options.debug;

  this.getScore = () => state.score;

  this.getMoves = () => state.moves;

  this.getItemsFromInventory = () => _.map(state.inv, this.getItem);

  this.getRoom = roomId => data.rooms[roomId];

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

  this.setBriefMode = (mode) => { state.options.brief = mode; };

  this.setCurrentRoom = (roomId) => { state.currentRoom = roomId; };

  this.setDebugMode = (mode) => { state.options.debug = mode; };
}

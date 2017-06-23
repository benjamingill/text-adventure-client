// import short from 'short-uuid';
import * as actions from '../actions';
import { getRoom } from '../room';

export const commandBrief = {
  command: 'brief',
  pattern: new RegExp(/^(b|brief)$/i),
  action: (state, dispatch) => {
    const brief = !state.options.brief;
    const options = Object.assign({}, state.options, { brief });
    const newState = Object.assign({}, state, { options });
    dispatch(actions.game(newState));
    const description = `Brief mode: ${brief ? 'on' : 'off'}\n`;
    dispatch(actions.output(description));
  },
};

export const clear = {
  command: 'clear',
  pattern: new RegExp(/^(cls|clear)$/i),
  action: state => Object.assign({}, state, { buffer: '' }),
};

export const commandDebug = {
  command: 'debug',
  pattern: new RegExp(/^(debug)$/i),
  action: (state, dispatch) => {
    const debug = !state.options.debug;
    const options = Object.assign({}, state.options, { debug });
    const newState = Object.assign({}, state, { options });
    dispatch(actions.game(newState));
    const description = `Debug mode: ${debug ? 'on' : 'off'}\n`;
    dispatch(actions.output(description));
  },
};

export const debugShowRoom = {
  command: 'debugShowRoom',
  pattern: new RegExp(/^(debug show room)$/i),
  action: (state, dispatch) => {
    const room = getRoom(state.currentRoom);
    const description = JSON.stringify(room, null, '\u00A0\u00A0');
    dispatch(actions.output(`${description}.\n`));
  },
};

export const debugShowState = {
  command: 'debugShowState',
  pattern: new RegExp(/^(debug show state)$/i),
  action: (state, dispatch) => {
    const description = JSON.stringify(state, null, '\u00A0\u00A0');
    dispatch(actions.output(`${description}.\n`));
  },
};

export const invalidCommand = {
  command: 'invalid',
  pattern: new RegExp(/^(.+)$/i),
  action: (state, dispatch) => {
    // can be async
    // fetch('http://localhost:3000/unknownCommand', { method: 'post', body: groups });
    dispatch(actions.output('I do not understand that command.\n'));
  },
};

export const load = {
  command: 'load',
  pattern: new RegExp(/^(load)(.*)$/i),
  action: (state, dispatch) => {
    dispatch(actions.output('Loading is not implemented yet.\n'));
  },
};

// let lastSavedId;
// let lastSavedGame;

export const save = {
  command: 'save',
  pattern: new RegExp(/^(save)$/i),
  action: (state, dispatch) => {
    dispatch(actions.output('Saving is not implemented yet.\n'));
    // const savedGame = window.btoa(JSON.stringify(state));
    // if (savedGame !== lastSavedGame) {
    //   const translator = short();
    //   lastSavedGame = savedGame;
    //   lastSavedId = translator.new();
    //   // save the game
    //   dispatch(actions.output('Saving...\n'));
    // }
    // if (lastSavedId) {
    //   dispatch(actions.output(`State saved as ${lastSavedId}.\n`));
    // } else {
    //   dispatch(actions.output('Nothing to save.\n'));
    // }
  },
};

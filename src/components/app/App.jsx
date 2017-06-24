import React from 'react';
import ConsoleComponent from '../consoleComponent/ConsoleComponent';
import * as actions from '../../game/actions';
import { intro, initialState, parse, prompt } from '../../game/game';
import { currentRoom } from '../../game/room';
import './App.css';

const stateExists = () => !!localStorage.getItem('game');
const getSavedState = () => JSON.parse(localStorage.getItem('game'));
const setSavedState = game => localStorage.setItem('game', JSON.stringify(game));

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      buffer: intro,
      game: initialState,
    };
  }

  componentWillMount = () => {
    if (stateExists()) {
      this.dispatch(actions.game(getSavedState()));
    }
  };

  dispatch = (action) => {
    switch (action.type) {
      case 'GAME':
        this.setState({ game: action.value });
        setSavedState(this.state.game);
        break;
      case 'OUTPUT':
        this.setState({ buffer: this.state.buffer.concat(action.value) });
        break;
      default:
        break;
    }
  }

  processInput = (input) => {
    this.dispatch(actions.output(`${input}\n`));
    parse(this.state.game, this.dispatch, input);
    this.dispatch(actions.output(`\n${prompt}`));
  };

  render = () => (
    <div className="app">
      <div className="app-header">
        <h2>sweet text adventure</h2>
      </div>
      <div className="app-body">
        <ConsoleComponent
          buffer={this.state.buffer}
          moves={this.state.game.moves}
          score={this.state.game.score}
          title={currentRoom(this.state.game) ? currentRoom(this.state.game).name : 'Limbo'}
          processInput={this.processInput}
        />
      </div>
    </div>
  );
}

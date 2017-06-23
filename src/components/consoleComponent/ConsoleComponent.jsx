import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import StringBuilder from 'string-builder';
import './ConsoleComponent.css';

export default class ConsoleComponent extends React.Component {
  static propTypes = {
    buffer: PropTypes.string.isRequired,
    moves: PropTypes.number.isRequired,
    processInput: PropTypes.func.isRequired,
    score: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      buffer: [],
      cursorVisible: true,
      input: '',
      history: [],
      historyIndex: 0,
    };
  }

  componentDidMount = () => {
    document.onkeypress = e => this.handleKeyPress(e);
    document.onkeydown = e => this.handleKeyDown(e);
    this.timerID = setInterval(this.toggleCursor, 500);
    this.scrollToBottom();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.buffer.length !== this.props.buffer.length) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    document.onkeypress = () => { };
    clearInterval(this.timerID);
  }

  scrollToBottom = () => {
    /* eslint-disable react/no-find-dom-node */
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    if (node && node.scrollIntoView) {
      node.scrollIntoView();
    }
    /* eslint-enable react/no-find-dom-node */
  };

  handleKeyDown = (e) => {
    const code = e.which || e.keyCode;
    if (code === 8) { // backspace
      e.preventDefault();
      this.setState({ input: this.state.input.slice(0, -1) });
    } else if (code === 13) { // enter
      e.preventDefault();
      // process input
      this.props.processInput(this.state.input);
      if (this.state.input.length) {
        const history = this.state.history.concat(this.state.input);
        const historyIndex = history.length;
        this.setState({ history, historyIndex });
      }
      this.setState({ input: '' });
    } else if (code === 27) { // escape
      e.preventDefault();
      this.setState({ input: '' });
    } else if (code === 38) { // up
      e.preventDefault();
      if (this.state.historyIndex > 0) {
        const historyIndex = this.state.historyIndex - 1;
        const input = this.state.history[historyIndex];
        this.setState({ input, historyIndex });
      }
    }
  }

  handleKeyPress = (e) => {
    const code = e.which || e.keyCode;
    if (code >= 32 && code <= 126) { // printable chars
      e.preventDefault();
      this.setState({ input: this.state.input.concat(e.key) });
    }
  }


  handleKeyPress = (e) => {
    const code = e.which;// || e.keyCode;
    if (code >= 32 && code <= 126) { // printable chars
      e.preventDefault();
      this.setState({ input: this.state.input.concat(e.key), cursorVisible: true });
    } else if (code === 8) { // backspace
      e.preventDefault();
      this.setState({ input: this.state.input.slice(0, -1) });
    } else if (code === 13) { // enter
      e.preventDefault();
      // process input
      this.props.processInput(this.state.input);
      this.setState({ input: '' });
    } else if (code === 27) { // escape
      e.preventDefault();
      this.setState({ input: '' });
    }
  };

  toggleCursor = () => {
    this.setState({ cursorVisible: !this.state.cursorVisible });
  };

  /* eslint-disable react/no-array-index-key */
  render = () => {
    const sb = new StringBuilder();
    sb.append(this.props.buffer);
    sb.append(this.state.input);
    sb.append(this.state.cursorVisible ? '\u2588' : '\u00A0');
    return (
      <div className="console-component">
        <div className="console-header">
          <div className="title">{this.props.title}</div>
          <div className="stats">{`Score: ${this.props.score} Moves: ${this.props.moves}`}</div>
        </div>
        <div className="console-body">
          <div>{sb.toString().split('\n').map((s, i) => (<div key={i}>{s || '\u00A0'}</div>))}</div>
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={(el) => { this.messagesEnd = el; }}
          />
        </div>
      </div >
    );
  };
  /* eslint-enable react/no-array-index-key */
}

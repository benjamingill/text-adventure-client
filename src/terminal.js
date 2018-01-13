import _ from 'lodash';
import StringBuilder from 'string-builder';

export default function Terminal(render, processInput) {
  this.buffer = new StringBuilder();
  this.prompt = '> ';
  this.input = '';
  this.history = [];
  this.historyIndex = 0;
  this.cursorVisible = true;

  const handleInput = (input) => {
    try {
      processInput(this, input);
    } catch (e) {
      this.appendLine(e.message);
    }
  };

  this.handleChange = () => {
    if (render) {
      render(this.toString());
    }
  };

  this.toggleCursor = () => {
    this.cursorVisible = !this.cursorVisible;
    this.handleChange();
  };

  this.appendLine = (text = '') => {
    if (typeof text === 'undefined') {
      this.buffer.append('undefined');
    }
    this.buffer.append(_.replace(text, / /, '\u00A0'));
    this.buffer.append('\n');
    this.handleChange();
  };

  this.handleKeyPress = (code, key) => {
    let temp;
    switch (code) {
      case 8:
        // backspace
        this.input = this.input.slice(0, -1);
        this.cursorVisible = true;
        this.handleChange();
        return true;
      case 13:
        // enter
        this.buffer.append(this.prompt);
        temp = this.input;
        this.buffer.append(this.input);
        this.buffer.append('\n');
        this.input = '';
        this.cursorVisible = true;
        this.handleChange();
        handleInput(temp);
        temp = '';
        return true;
      case 27:
        // escape
        this.input = '';
        this.cursorVisible = true;
        this.handleChange();
        return true;
      case 38:
        // up
        if (this.historyIndex > 0) {
          const historyIndex = this.historyIndex - 1;
          this.input = this.history[historyIndex];
          this.cursorVisible = true;
          this.handleChange();
          return true;
        }
        break;
      default:
        if (code >= 32 && code <= 90) {
          // printable chars
          this.input = `${this.input}${key}`;
          this.cursorVisible = true;
          this.handleChange();
          return true;
        }
    }
    return false;
  };

  this.toString = () => {
    const sb = new StringBuilder();
    sb.append(this.buffer);
    sb.append(this.prompt);
    sb.append(this.input);
    sb.append(this.cursorVisible ? '\u2588' : '\u00A0');
    return sb.toString();
  };
}

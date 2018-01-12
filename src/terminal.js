import size from 'lodash/size';
import StringBuilder from 'string-builder';

export default function Terminal(modified) {
  this.buffer = new StringBuilder();
  this.prompt = '> ';
  this.input = '';
  this.history = [];
  this.historyIndex = 0;
  this.cursorVisible = true;

  this.handleChange = () => {
    if (modified) {
      modified(this.toString());
    }
  };

  this.toggleCursor = () => {
    this.cursorVisible = !this.cursorVisible;
    this.handleChange();
  };

  this.append = (text) => {
    this.buffer.append(text);
    this.handleChange();
  };

  this.appendLine = (text) => {
    this.buffer.append(text);
    this.buffer.append('\n');
    this.handleChange();
  };

  this.handleKeyPress = (code, key) => {
    switch (code) {
      case 8:
        // backspace
        this.input = this.input.slice(0, -1);
        this.cursorVisible = true;
        this.handleChange();
        return true;
      case 13:
        // enter
        if (size(this.input)) {
          this.buffer.append(this.prompt);
        }
        this.buffer.append(this.input);
        this.buffer.append('\n');
        this.input = '';
        this.cursorVisible = true;
        this.handleChange();
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

import StringBuilder from 'string-builder';

export default function Terminal(renderBuffer, processInput) {
  this.buffer = new StringBuilder();
  this.prompt = '>\u00A0';
  this.input = '';
  this.cursorVisible = true;

  const handleInput = (input) => {
    try {
      processInput(this, input);
    } catch (e) {
      this.appendLine(e.message);
    }
  };

  const handleChange = () => renderBuffer(this.toString());

  this.toggleCursor = () => {
    this.cursorVisible = !this.cursorVisible;
    handleChange();
  };

  this.appendLine = (text) => {
    if (typeof text === 'undefined') {
      this.buffer.append('error: attempting to render undefined string');
    }
    this.buffer.append(text);
    this.buffer.append('\n');
    handleChange();
  };

  this.handleKeyPress = (code, key) => {
    let temp;
    switch (code) {
      case 8:
        // backspace
        this.input = this.input.slice(0, -1);
        this.cursorVisible = true;
        handleChange();
        return true;
      case 13:
        // enter
        this.buffer.append(this.prompt);
        temp = this.input;
        this.buffer.append(this.input);
        this.buffer.append('\n');
        this.input = '';
        this.cursorVisible = true;
        handleChange();
        handleInput(temp);
        temp = '';
        return true;
      case 27:
        // escape
        this.input = '';
        this.cursorVisible = true;
        handleChange();
        return true;
      default:
        if (code >= 32 && code <= 90) {
          // printable chars
          this.input = `${this.input}${key}`;
          this.cursorVisible = true;
          handleChange();
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

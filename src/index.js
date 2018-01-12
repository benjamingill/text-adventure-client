import _ from 'lodash';
import Terminal from './terminal';
import './index.css';

const ROWS = 20;

const pane = document.getElementById('console-body');
for (let i = 0; i < ROWS; i += 1) {
  const element = document.createElement('div');
  element.className = `console-line line-${i}`;
  pane.appendChild(element);
}

const render = (buffer) => {
  const lines = _.split(buffer, '\n');
  const bottom = Math.min(ROWS - 1, lines.length - 1);
  let linesDrawn = 0;
  for (let i = bottom; i >= 0; i -= 1) {
    const line = lines[lines.length - 1 - linesDrawn];
    linesDrawn += 1;
    pane.children[i].innerHTML = line || '\u00A0';
  }
};

const terminal = new Terminal(render);

function onKeyDown(event) {
  if (terminal.handleKeyPress(event.which, event.key)) {
    event.preventDefault();
  }
}

setInterval(() => terminal.toggleCursor(), 550);

document.addEventListener('keydown', onKeyDown, false);

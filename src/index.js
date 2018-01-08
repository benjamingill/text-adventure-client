import _ from 'lodash';
import Terminal from './terminal';
import './index.css';

const consoleBody = document.getElementById('console-body');

const createElement = (line) => {
  const element = document.createElement('div');
  element.className = 'console-line';
  element.innerText = line;
  return element;
};

const render = (buffer) => {
  const lines = _.split(buffer, '\n');
  const elements = _.map(lines, createElement);
  while (consoleBody.firstChild) {
    consoleBody.removeChild(consoleBody.firstChild);
  }
  _.forEach(elements, element => consoleBody.appendChild(element));
};

const terminal = new Terminal(render);

function onKeyDown(event) {
  if (terminal.handleKeyPress(event.which, event.key)) {
    event.preventDefault();
  }
}

document.addEventListener('keydown', onKeyDown, false);

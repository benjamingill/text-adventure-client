import look from './commands/look';
import Player from './player';
import World from './world';
import Terminal from './terminal';
import parser from './parser';
import './index.css';

const player = new Player();
const world = new World();

const renderConsole = (buffer) => {
  const oldLength = document.getElementById('console-body').innerText.length;
  document.getElementById('console-body').innerText = buffer;
  document.getElementById('title').innerHTML = world.getRoom(player.getCurrentRoom()).name;
  document.getElementById('score').innerHTML = `Score: ${player.getCurrentScore()}`;

  if (buffer.length !== oldLength) {
    document.getElementById('scroll-bottom').scrollIntoView(true);
  }
};

const processInput = (terminal, input) => {
  if (!input) {
    return;
  }
  const container = {
    player,
    world,
    terminal,
  };
  parser(container, input);
};

const terminal = new Terminal(renderConsole, processInput);
terminal.appendLine('\n\u00A0\u00A0Welcome to SWEET TEXT ADVENTURE!\n\u00A0\u00A0(c) 1982 Some Ficticious Company\n');

look.action({
  player: new Player(),
  world,
  terminal,
});

function onKeyDown(event) {
  if (terminal.handleKeyPress(event.which, event.key)) {
    event.preventDefault();
  }
}

setInterval(() => terminal.toggleCursor(), 550);

document.addEventListener('keydown', onKeyDown, false);

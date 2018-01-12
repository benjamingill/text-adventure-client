const action = (container) => {
  container.player.setCurrentRoom(2);
  container.terminal.appendLine('You move to the north.');
};

export default {
  pattern: /^n$|^north$/,
  action,
};

const action = ({ world, terminal }, matches) => {
  if (matches[1] === '') {
    world.setDebugMode(!world.getDebugMode());
  } else {
    world.setDebugMode(matches[1] === 'on');
  }
  const debug = world.getDebugMode();
  terminal.appendLine(`Debug mode ${debug ? 'on' : 'off'}.`);
};

export default {
  pattern: /^debug\s*(\w*)$/,
  action,
};

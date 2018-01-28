const action = ({ world, terminal }, matches) => {
  if (matches[1] === '') {
    world.setBriefMode(!world.getBriefMode());
  } else {
    world.setBriefMode(matches[1] === 'on');
  }
  const brief = world.getBriefMode();
  terminal.appendLine(`Brief mode ${brief ? 'on' : 'off'}.`);
};

export default {
  pattern: /^brief\s*(\w*)$/,
  action,
};

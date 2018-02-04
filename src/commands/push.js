export default {
  pattern: /^push$/,
  action: ({ terminal }) => terminal.appendLine('Push what?'),
};

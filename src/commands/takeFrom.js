import _ from 'lodash';

const action = ({ terminal }) => {
  terminal.appendLine('Not Implemented.');
};

export default {
  pattern: /^\s*take\s+([\w\s]+)\s+from\s+([\w\s]+)\s*$|^\s*take\s+from\s*$|/,
  action,
};

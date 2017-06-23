import * as actions from '../actions';
import helpFile from '../../data/help.yaml';

const helpTopics = {};
Object.keys(helpFile).forEach((key) => {
  helpTopics[key] = helpFile[key];
  if (helpFile[key].keywords) {
    helpFile[key].keywords.forEach((keyword) => {
      helpTopics[keyword] = helpFile[key];
    });
  }
});

const parseTopic = groups => (groups[2] ? groups[2].trim() : 'help');
const matchesTopic = (key, topic) => key.startsWith(topic);

const renderHelp = (state, dispatch, topic) => {
  const key = Object.keys(helpTopics).find(t => matchesTopic(t, topic));
  if (key) {
    dispatch(actions.output(`${helpTopics[key].manual}\n`));
    return state;
  }
  dispatch(actions.output(`I don't know about any '${topic}'.\n\n`));
  return renderHelp(state, dispatch, 'help');
};

export default {
  command: 'help',
  pattern: new RegExp(/^(help|h)(.*)$/i),
  action: (state, dispatch, groups) => renderHelp(state, dispatch, parseTopic(groups)),
};

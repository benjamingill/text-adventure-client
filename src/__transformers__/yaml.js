/* eslint-disable import/no-extraneous-dependencies */
// import jsonLoader from 'json-loader';
// import yamlLoader from 'yaml-loader';
const jsonLoader = require('json-loader');
const yamlLoader = require('yaml-loader');
/* eslint-enable import/no-extraneous-dependencies */

module.exports = {
  process(src) {
    const js = jsonLoader(yamlLoader(src));
    return `module.exports = ${js};`;
  },
};

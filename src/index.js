import React from 'react';
import ReactDOM from 'react-dom';
/* eslint-disable import/extensions */
import App from './components/app/App.jsx';
/* eslint-enable import/extensions */
import registerServiceWorker from './registerServiceWorker';
import './index.css';

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(<App />, document.getElementById('root'));
/* eslint-enable react/jsx-filename-extension */

registerServiceWorker();

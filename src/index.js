import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'url-search-params-polyfill';
import {EnvVariable} from './config';
import './index.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers/reducers.js';
import MainRoute from './routes/index';
const ReactGA = require('react-ga');

ReactGA.initialize(EnvVariable.googleAnalyticsId);

const logPageView = () => {
    ReactGA.set({page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};

const root = document.getElementById('root');

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store} >
        <MainRoute logPageView={logPageView}  />
    </Provider>,
    root
);
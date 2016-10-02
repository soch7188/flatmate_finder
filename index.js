import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore();

injectTapEventPlugin();

render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes}/>
    </Provider>,
    document.getElementById('root')
);


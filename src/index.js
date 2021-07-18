import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Routes from './Routes';
import {createStore} from 'redux';
import RootReducer from './redux/reducer/root-reducer';
import {Provider} from 'react-redux';

const store = createStore(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store = {store} >
    <Routes />
  </Provider>,
  document.getElementById('root')
);



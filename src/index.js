import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import configureStore from './modules/app/configureStore';
import App from './modules/app/App';
import { login, logout, startSetExpenses } from './modules/app/reducers';
import { firebase } from './firebase/firebase';

const history = createHistory();
const store = configureStore();
const app = (
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} />
    </Router>
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(app, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

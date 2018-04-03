import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import configureStore from './modules/app/configureStore';
import AppRouter, { history } from './modules/app/components/routes/AppRouter';
import { login, logout, startSetExpenses } from './modules/app/reducers';
import { firebase } from './firebase/firebase';
import LoadingPage from './modules/app/components/pages/LoadingPage';

const store = configureStore();
const app = (
  <Provider store={store}>
    <Router history={history}>
      <AppRouter />
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

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

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

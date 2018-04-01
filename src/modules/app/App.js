import React, { Component } from 'react';

// import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
// Componets
import AddExpensePage from './components/pages/AddExpensePage';
import ExpenseDashboardPage from './components/pages/ExpenseDashboardPage';
import EditExpensePage from './components/pages/EditExpensePage';
import Header from './components/layout/Header';
import NotFoundPage from './components/pages/NotFoundPage';
import LoginPage from './components/pages/LoginPage';
// Routes
// import PrivateRoute from './components/routes/PrivateRoute';
// /import PublicRoute from './components/routes/PublicRoute';

import '../../styles/styles.scss';

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <Route path="/dashboard" component={ExpenseDashboardPage} exact />
          <Route path="/create" component={AddExpensePage} />
          <Route path="/edit/:id" component={EditExpensePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

import React from 'react';

import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink exact to="/" activeClassName="is-active">
      Dashboard
    </NavLink>
    <NavLink exact to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    <NavLink exact to="/edit" activeClassName="is-active">
      Edit Expense
    </NavLink>
    <NavLink exact to="/help" activeClassName="is-active">
      Help
    </NavLink>
  </header>
);

export default Header;

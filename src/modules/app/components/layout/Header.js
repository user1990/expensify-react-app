import React from 'react';

import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../../reducers';

const Header = ({ startLogout }) => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active">
      Create Expense
    </NavLink>
    <button onClick={startLogout}>Logout</button>
  </header>
);

Header.propTypes = {
  startLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);

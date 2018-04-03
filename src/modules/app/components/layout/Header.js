import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../../reducers';

const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Expensify</h1>
        </Link>
        <button className="button button--link" onClick={startLogout}>
          Logout
        </button>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  startLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);

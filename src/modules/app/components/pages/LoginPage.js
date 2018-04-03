import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startLogin } from '../../reducers';

export const LoginPage = ({ startLogin }) => (
  <div className="login-layout">
    <div className="login-layout__box">
      <h1 className="login-layout__title">Expensify</h1>
      <p>Start managing your expenses</p>
      <button className="button" onClick={startLogin}>
        Login with Google
      </button>
    </div>
  </div>
);

LoginPage.propTypes = {
  startLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

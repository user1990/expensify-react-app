import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startLogin } from '../../reducers';

class LoginPage extends Component {
  componentDidMount = () => {};

  render() {
    const { startLogin } = this.props;

    return (
      <div className="box-layout">
        <div className="box-layout__box">
          <h1 className="box-layout__title">Expensify</h1>
          <p>Start managing your expenses</p>
          <button className="button" onClick={startLogin}>
            Login with Google
          </button>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  startLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
});

const LoginPageContainer = connect(null, mapDispatchToProps)(LoginPage);

export default LoginPageContainer;

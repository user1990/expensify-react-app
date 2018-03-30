import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense } from '../../reducers';
import ExpenseForm from '../Forms/ExpenseForm';

class AddExpensePage extends Component {
  onSubmit = expense => {
    this.props.addExpense(expense);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

AddExpensePage.propTypes = {
  addExpense: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addExpense: expense => dispatch(addExpense(expense)),
});

const AddExpensePageContainer = connect(null, mapDispatchToProps)(
  AddExpensePage
);

export default AddExpensePageContainer;

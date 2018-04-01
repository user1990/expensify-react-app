import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpenseForm from '../Forms/ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../../reducers';

class EditExpensePage extends Component {
  onSubmit = expense => {
    const expenseId = this.props.expense && this.props.expense.id;

    this.props.startEditExpense(expenseId, expense);
    this.props.history.push('/');
  };

  handleRemoveExpense = () => {
    const expenseId = this.props.expense && this.props.expense.id;

    this.props.startRemoveExpense({ id: expenseId });
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.handleRemoveExpense}>Remove</button>
      </div>
    );
  }
}

EditExpensePage.propTypes = {
  history: PropTypes.object.isRequired,
  expense: PropTypes.object.isRequired,
  startEditExpense: PropTypes.func.isRequired,
  startRemoveExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, updates) => dispatch(startEditExpense(id, updates)),
  startRemoveExpense: id => dispatch(startRemoveExpense(id)),
});

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

const EditExpensePageContainer = connect(mapStateToProps, mapDispatchToProps)(
  EditExpensePage
);

export default EditExpensePageContainer;

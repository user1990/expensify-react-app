import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpenseForm from '../Forms/ExpenseForm';
import { editExpense, removeExpense } from '../../reducers';

class EditExpensePage extends Component {
  onSubmit = expense => {
    const expenseId = this.props.expense && this.props.expense.id;

    this.props.editExpense(expenseId, expense);
    this.props.history.push('/');
  };

  handleRemoveExpense = () => {
    const expenseId = this.props.expense && this.props.expense.id;

    this.props.removeExpense({ id: expenseId });
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
  editExpense: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  editExpense: (id, updates) => dispatch(editExpense(id, updates)),
  removeExpense: id => dispatch(removeExpense(id)),
});

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

const EditExpensePageContainer = connect(mapStateToProps, mapDispatchToProps)(
  EditExpensePage
);

export default EditExpensePageContainer;

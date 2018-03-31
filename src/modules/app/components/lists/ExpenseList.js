import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectExpenses from '../../selectors/expenses';
import ExpenseListItem from './ExpenseListItem';

const ExpenseList = props => (
  <div>
    {console.log(props)}
    <h1>Expense List</h1>
    {props.expenses &&
      props.expenses.map(expense => (
        <ExpenseListItem key={expense.id} {...expense} />
      ))}
  </div>
);

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  expenses: selectExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);

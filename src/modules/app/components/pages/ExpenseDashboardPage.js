import React from 'react';

import ExpenseList from '../lists/ExpenseList';
import ExpenseListFilters from '../lists/ExpenseListFilters';
import ExpensesSummary from '../pages/ExpensesSummary';

const ExpenseDashboardPage = () => (
  <div>
    <ExpensesSummary />
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;

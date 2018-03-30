import React from 'react';

import ExpenseList from '../lists/ExpenseList';
import ExpenseListFilters from '../lists/ExpenseListFilters';

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseListFilters />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;

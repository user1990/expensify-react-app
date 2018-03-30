/* eslint-disable no-undef */
import {
  addExpense,
  editExpense,
  removeExpense,
} from '../../modules/app/reducers';

// ADD/EXPENSE with provided values
test('should setup add expense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'This was last months rent',
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD/EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String),
    },
  });
});

// ADD/EXPENSE with default values
test('should setup add expense action object with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD/EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
    },
  });
});

// EDIT/EXPENSE
test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT/EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value',
    },
  });
});

// REMOVE/EXPENSE
test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE/EXPENSE',
    id: '123abc',
  });
});

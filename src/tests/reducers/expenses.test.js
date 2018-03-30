/* eslint-disable no-undef */
import expenses from '../fixtures/expenses';
import { expensesReducer } from '../../modules/app/reducers';

// Set default state
test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

// Remove expense by id
test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE/EXPENSE',
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

// Not remove expenses if id not found
test('should not remove expenses if id not found', () => {
  const action = {
    type: 'REMOVE/EXPENSE',
    id: '-1',
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

// Add an expense
test('should add an expense', () => {
  const expense = {
    id: '109',
    description: 'Laptop',
    note: '',
    createdAt: 20000,
    amount: 29500,
  };
  const action = {
    type: 'ADD/EXPENSE',
    expense,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

// Edit an expense
test('should edit an expense', () => {
  const amount = 122000;
  const action = {
    type: 'EDIT/EXPENSE',
    id: expenses[1].id,
    updates: {
      amount,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].amount).toBe(amount);
});

// Not edit an expense if id not found'
test('should not edit an expense if id not found', () => {
  const amount = 122000;
  const action = {
    type: 'EDIT/EXPENSE',
    id: '-1',
    updates: {
      amount,
    },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

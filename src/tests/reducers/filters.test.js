/* eslint-disable no-undef */
import moment from 'moment';
import { filtersReducer } from '../../modules/app/reducers';

// Setup default filter values
test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  });
});

// Set sortBy to amount
test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT/BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

// Set sortBy to date
test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount',
  };
  const action = { type: 'SORT/BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

// Set text filter
test('should set text filter', () => {
  const text = 'This is my filter';
  const action = {
    type: 'SET/TEXT_FILTER',
    text,
  };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(text);
});

// Set startDate filter
test('should set startDate filter', () => {
  const startDate = moment();
  const action = {
    type: 'SET/START_DATE',
    startDate,
  };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(startDate);
});

// Set endDate filter
test('should set endDate filter', () => {
  const endDate = moment();
  const action = {
    type: 'SET/END_DATE',
    endDate,
  };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(endDate);
});

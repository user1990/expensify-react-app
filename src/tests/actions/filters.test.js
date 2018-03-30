/* eslint-disable no-undef */
import moment from 'moment';
import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByAmount,
  sortByDate,
} from '../../modules/app/reducers';

// SET/START_DATE
test('should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET/START_DATE',
    startDate: moment(0),
  });
});

// SET/END_DATE
test('should generate set end date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET/END_DATE',
    endDate: moment(0),
  });
});

// SET/TEXT_FILTER
test('should generate set text filter object with text value', () => {
  const text = 'Something in';
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: 'SET/TEXT_FILTER',
    text,
  });
});

// SET/TEXT_FILTER
test('should generate set text filter object with default', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET/TEXT_FILTER',
    text: '',
  });
});

// SORT/BY_DATE
test('should generate action object for sort by date', () => {
  expect(sortByDate()).toEqual({ type: 'SORT/BY_DATE' });
});

// SORT/BY_AMOUNT'
test('should generate action object for sort by amount', () => {
  expect(sortByAmount()).toEqual({ type: 'SORT/BY_AMOUNT' });
});

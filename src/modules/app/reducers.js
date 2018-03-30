/* eslint-disable spaced-comment */
/* eslint-disable */
//import api from '../../services/api';
import moment from 'moment';
import uuid from 'uuid';
import { firebase, googleAuthProvider } from '../../firebase/firebase';

///// CONSTANTS /////
export const actionTypes = {
  ADD_EXPENSE: 'ADD/EXPENSE',
  REMOVE_EXPENSE: 'REMOVE/EXPENSE',
  EDIT_EXPENSE: 'EDIT/EXPENSE',

  SET_TEXT_FILTER: 'SET/TEXT_FILTER',
  SORT_BY_AMOUNT: 'SORT/BY_AMOUNT',
  SORT_BY_DATE: 'SORT/BY_DATE',
  SET_START_DATE: 'SET/START_DATE',
  SET_END_DATE: 'SET/END_DATE',
};

///// ACTIONS /////
// Expenses
export const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: actionTypes.ADD_EXPENSE,
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

export const removeExpense = ({ id } = {}) => ({
  type: actionTypes.REMOVE_EXPENSE,
  id,
});

export const editExpense = (id, updates) => ({
  type: actionTypes.EDIT_EXPENSE,
  id,
  updates,
});

// Filters
export const setTextFilter = (text = '') => ({
  type: actionTypes.SET_TEXT_FILTER,
  text,
});

export const sortByDate = () => ({
  type: actionTypes.SORT_BY_DATE,
});

export const sortByAmount = () => ({
  type: actionTypes.SORT_BY_AMOUNT,
});

export const setStartDate = startDate => ({
  type: actionTypes.SET_START_DATE,
  startDate,
});

// SET_END_DATE
export const setEndDate = endDate => ({
  type: actionTypes.SET_END_DATE,
  endDate,
});

///// REDUCERS /////
// Expenses Reducer
export const expensesReducer = (expenses = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_EXPENSE:
      return [...expenses, action.expense];

    case actionTypes.REMOVE_EXPENSE:
      return expenses.filter(({ id }) => id !== action.id);

    case actionTypes.EDIT_EXPENSE:
      return expenses.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        } else {
          return expense;
        }
      });
    default:
      return expenses;
  }
};

// Filters
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
};

export const filtersReducer = (
  filters = filtersReducerDefaultState,
  action
) => {
  switch (action.type) {
    case actionTypes.SET_TEXT_FILTER:
      return {
        ...filters,
        text: action.text,
      };
    case actionTypes.SORT_BY_AMOUNT:
      return {
        ...filters,
        sortBy: 'amount',
      };
    case actionTypes.SORT_BY_DATE:
      return {
        ...filters,
        sortBy: 'date',
      };
    case actionTypes.SET_START_DATE:
      return {
        ...filters,
        startDate: action.startDate,
      };
    case actionTypes.SET_END_DATE:
      return {
        ...filters,
        endDate: action.endDate,
      };
    default:
      return filters;
  }
};

///// SELECTORS /////

// Get visible expenses
export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, 'day')
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, 'day')
        : true;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

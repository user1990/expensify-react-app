/* eslint-disable spaced-comment */
import moment from 'moment';
import uuid from 'uuid';
import database, {
  firebase,
  googleAuthProvider,
} from '../../firebase/firebase';

///// CONSTANTS /////
export const actionTypes = {
  USER_LOGIN: 'USER/LOGIN',
  USER_LOGOUT: 'USER/LOGOUT',

  ADD_EXPENSE: 'ADD/EXPENSE',
  REMOVE_EXPENSE: 'REMOVE/EXPENSE',
  EDIT_EXPENSE: 'EDIT/EXPENSE',
  SET_EXPENSES: 'SET/EXPENSE',

  SET_TEXT_FILTER: 'SET/TEXT_FILTER',
  SORT_BY_AMOUNT: 'SORT/BY_AMOUNT',
  SORT_BY_DATE: 'SORT/BY_DATE',
  SET_START_DATE: 'SET/START_DATE',
  SET_END_DATE: 'SET/END_DATE',
};

///// ACTIONS /////
// Auth
export const login = uid => ({
  type: actionTypes.USER_LOGIN,
  uid,
});

export const startLogin = () => () =>
  firebase.auth().signInWithPopup(googleAuthProvider);

export const logout = () => ({
  type: actionTypes.USER_LOGOUT,
});

export const startLogout = () => () => firebase.auth().signOut();

// Expenses
// ADD_EXPENSE
export const addExpense = expense => ({
  type: actionTypes.ADD_EXPENSE,
  expense,
});

export const startAddExpense = (expenseData = {}) => (dispatch, getState) => {
  const uid = getState().auth.uid;
  const {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0,
  } = expenseData;
  const expense = { description, note, amount, createdAt };

  return database
    .ref(`users/${uid}/expenses`)
    .push(expense)
    .then(ref => {
      dispatch(
        addExpense({
          id: ref.key,
          ...expense,
        })
      );
    });
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: actionTypes.REMOVE_EXPENSE,
  id,
});

export const startRemoveExpense = ({ id } = {}) => (dispatch, getState) => {
  const uid = getState().auth.uid;
  return database
    .ref(`users/${uid}/expenses/${id}`)
    .remove()
    .then(() => {
      dispatch(removeExpense({ id }));
    });
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: actionTypes.EDIT_EXPENSE,
  id,
  updates,
});

export const startEditExpense = (id, updates) => (dispatch, getState) => {
  const uid = getState().auth.uid;
  return database
    .ref(`users/${uid}/expenses/${id}`)
    .update(updates)
    .then(() => {
      dispatch(editExpense(id, updates));
    });
};

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: actionTypes.SET_EXPENSES,
  expenses,
});

export const startSetExpenses = () => (dispatch, getState) => {
  const uid = getState().auth.uid;
  return database
    .ref(`users/${uid}/expenses`)
    .once('value')
    .then(snapshot => {
      const expenses = [];

      snapshot.forEach(childSnapshot => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });

      dispatch(setExpenses(expenses));
    });
};

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
// Auth
export const authReducer = (auth = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return { uid: action.uid };

    case actionTypes.USER_LOGOUT:
      return {};

    default:
      return auth;
  }
};

// Expenses
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
        }
        return expense;
      });

    case actionTypes.SET_EXPENSES:
      return action.expenses;

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

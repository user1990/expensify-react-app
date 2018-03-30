import { combineReducers } from 'redux';
import { expensesReducer, filtersReducer } from './reducers';

export default combineReducers({
  expenses: expensesReducer,
  filter: filtersReducer,
});

import { combineReducers } from 'redux';
import { authReducer, expensesReducer, filtersReducer } from './reducers';

export default combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
  filters: filtersReducer,
});

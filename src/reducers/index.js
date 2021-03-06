// @flow
import {combineReducers} from 'redux';
import contactReducer from './contacts';
import notificationReducer from './notification';

// Root Reducer
const rootReducer = combineReducers({
  contacts: contactReducer,
  notify: notificationReducer,
});

export default rootReducer;

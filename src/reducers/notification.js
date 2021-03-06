import {SET_LOADING, SET_NOTIFICATION} from '../constants/action-types';

const initialState = {
  notify: {visible: false, message: ''},
  loading: false,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        notify: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;

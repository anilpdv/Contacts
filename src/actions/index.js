import {
  SET_CONTACTS_LIST,
  SET_DUPLICATE_CONTACT_LIST,
  SET_LOADING,
  SET_NOTIFICATION,
} from '../constants/action-types';

export const setContactsInStore = (contacts) => (dispatch) => {
  dispatch({
    type: SET_CONTACTS_LIST,
    payload: contacts,
  });
};

export const setDuplicateContacts = (contacts) => (dispatch) => {
  dispatch({
    type: SET_DUPLICATE_CONTACT_LIST,
    payload: contacts,
  });
};

export const setNotification = (notifyObj) => (dispatch) => {
  dispatch({
    type: SET_NOTIFICATION,
    payload: notifyObj,
  });
};

export const setLoading = (value) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: value,
  });
};

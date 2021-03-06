import {
  SET_CONTACTS_LIST,
  SET_DUPLICATE_CONTACT_LIST,
} from '../constants/action-types';

const initialState = {
  contacts: [],
  loading: false,
  duplicate_contact_type: '',
  duplicate_contacts: [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS_LIST:
      return {
        ...state,
        contacts: action.payload,
      };

    case SET_DUPLICATE_CONTACT_LIST:
      return {
        ...state,
        duplicate_contacts: action.payload,
      };

    default:
      return state;
  }
};

export default contactReducer;

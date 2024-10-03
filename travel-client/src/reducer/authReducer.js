import { REGISTER_SUCCESS, LOGIN_SUCCESS, GOOGLE_LOGIN_SUCCESS, AUTH_FAIL } from '../actions/authActions';

const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case AUTH_FAIL:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

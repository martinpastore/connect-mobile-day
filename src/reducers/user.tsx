import {
  CREATE_USER_SUCCESS,
  CREATE_USER_STARTED,
  CREATE_USER_FAILURE,
  FETCH_USER_STARTED,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
} from "../actions/user";
import { AnyAction } from "redux";

const initialState = {
  user: {},
  loading: false,
  error: null,
};

function userReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case CREATE_USER_STARTED:
    case FETCH_USER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case CREATE_USER_SUCCESS:
    case FETCH_USER_SUCCESS:
      const data = {
        email: action.payload.user.email,
        displayName: action.payload.user.displayName,
      };

      return {
        ...state,
        loading: false,
        error: null,
        user: data,
      };
    case CREATE_USER_FAILURE:
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export default userReducer;

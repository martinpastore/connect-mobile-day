import firebase, { FirebaseError } from "firebase";
import { User } from "../types/User";
import { Dispatch } from "redux";

export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_STARTED = "CREATE_USER_STARTED";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_STARTED = "FETCH_USER_STARTED";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const createUser = ({ email, password, displayName }: User) => {
  return (dispatch: Dispatch) => {
    dispatch(createUserStarted());

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data: any) => {
        data.user
          .updateProfile({
            displayName: displayName,
          })
          .then(() => {
            dispatch(createUserSuccess(data));
          })
          .catch((error: FirebaseError) => {
            dispatch(createUserFailure(error));
          });
      })
      .catch((error) => {
        dispatch(createUserFailure(error));
      });
  };
};

export const createUserStarted = () => {
  return {
    type: CREATE_USER_STARTED,
  };
};

export const createUserSuccess = (data: any) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: data,
  };
};

export const createUserFailure = (error: FirebaseError) => {
  return {
    type: CREATE_USER_FAILURE,
    payload: { error },
  };
};

export const fetchUser = ({ email, password }: User) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchUserStarted());

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        dispatch(fetchUserSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
      });
  };
};

export const fetchUserStarted = () => {
  return {
    type: FETCH_USER_STARTED,
  };
};

export const fetchUserSuccess = (data: any) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data,
  };
};

export const fetchUserFailure = (error: FirebaseError) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: { error },
  };
};

import { Dispatch } from "redux";
import firebase, { FirebaseError } from "firebase";
import { Quiz } from "../types/Quiz";

export const CREATE_QUIZ = "CREATE_QUIZ";
export const CREATE_QUIZ_STARTED = "CREATE_QUIZ_STARTED";
export const CREATE_QUIZ_SUCCESS = "CREATE_QUIZ_SUCCESS";
export const CREATE_QUIZ_FAILURE = "CREATE_QUIZ_FAILURE";
export const FETCH_QUIZES = "FETCH_QUIZES";
export const FETCH_QUIZES_STARTED = "FETCH_QUIZES_STARTED";
export const FETCH_QUIZES_SUCCESS = "FETCH_QUIZES_SUCCESS";
export const FETCH_QUIZES_FAILURE = "FETCH_QUIZES_FAILURE";
export const UPDATE_QUIZES = "UPDATE_QUIZES";
export const UPDATE_QUIZES_STARTED = "UPDATE_QUIZES_STARTED";
export const UPDATE_QUIZES_SUCCESS = "UPDATE_QUIZES_SUCCESS";
export const UPDATE_QUIZES_FAILURE = "UPDATE_QUIZES_FAILURE";
export const SELECTED_QUIZ = "SELECTED_QUIZ";

export const createQuiz = ({ title, code }: Quiz) => {
  return (dispatch: Dispatch) => {
    dispatch(createQuizStarted());

    firebase
      .firestore()
      .collection("quizes")
      .add({
        title,
        code,
      })
      .then((data: any) => {
        dispatch(createQuizSuccess(data));
      })
      .catch((error: FirebaseError) => {
        dispatch(createQuizFailure(error));
      });
  };
};

export const createQuizStarted = () => {
  return {
    type: CREATE_QUIZ_STARTED,
  };
};

export const createQuizSuccess = (data: any) => {
  return {
    type: CREATE_QUIZ_SUCCESS,
    payload: data,
  };
};

export const createQuizFailure = (error: FirebaseError) => {
  return {
    type: CREATE_QUIZ_FAILURE,
    payload: error,
  };
};

export const fetchQuizes = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchQuizesStarted());

    firebase
      .firestore()
      .collection("quizes")
      .get()
      .then((data: any) => {
        const docs: any = data.docs.map((doc: any) => {
          const item = {
            id: doc.id,
            code: doc.data().code,
            title: doc.data().title,
            valorations: doc.data().valorations,
          };
          return item;
        });
        dispatch(fetchQuizesSuccess(docs));
      })
      .catch((error: FirebaseError) => {
        dispatch(fetchQuizFailure(error));
      });
  };
};

export const fetchQuizesStarted = () => {
  return {
    type: FETCH_QUIZES_STARTED,
  };
};

export const fetchQuizesSuccess = (data: any) => {
  return {
    type: FETCH_QUIZES_SUCCESS,
    payload: data,
  };
};

export const fetchQuizFailure = (error: FirebaseError) => {
  return {
    type: FETCH_QUIZES_FAILURE,
    payload: error,
  };
};

export const setSelectedQuiz = (quiz: Quiz) => {
  return {
    type: SELECTED_QUIZ,
    payload: quiz,
  };
};

export const updateQuizes = ({ id, valorations }: any) => {
  return (dispatch: Dispatch) => {
    dispatch(updateQuizesStarted());

    firebase
      .firestore()
      .collection("quizes")
      .doc(id)
      .update({
        valorations,
      })
      .then((data: any) => {
        dispatch(updateQuizesSuccess(data));
      })
      .catch((error: FirebaseError) => {
        dispatch(updateQuizFailure(error));
      });
  };
};

export const updateQuizesStarted = () => {
  return {
    type: UPDATE_QUIZES_STARTED,
  };
};

export const updateQuizesSuccess = (data: any) => {
  return {
    type: UPDATE_QUIZES_SUCCESS,
    payload: data,
  };
};

export const updateQuizFailure = (error: FirebaseError) => {
  return {
    type: UPDATE_QUIZES_FAILURE,
    payload: error,
  };
};

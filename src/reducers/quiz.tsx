import { AnyAction } from "redux";
import {
  CREATE_QUIZ_STARTED,
  CREATE_QUIZ_SUCCESS,
  CREATE_QUIZ_FAILURE,
  FETCH_QUIZES_STARTED,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_FAILURE,
  SELECTED_QUIZ,
  UPDATE_QUIZES_STARTED,
  UPDATE_QUIZES_SUCCESS,
  UPDATE_QUIZES_FAILURE,
} from "../actions/quiz";

const initialState = {
  quiz: {},
  quizes: [],
  loading: false,
  error: null,
};

const quizReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CREATE_QUIZ_STARTED:
    case FETCH_QUIZES_STARTED:
    case UPDATE_QUIZES_STARTED:
      return {
        ...state,
        loading: true,
      };
    case CREATE_QUIZ_SUCCESS:
    case SELECTED_QUIZ:
    case UPDATE_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        quiz: action.payload,
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        quizes: action.payload,
      };
    case CREATE_QUIZ_FAILURE:
    case FETCH_QUIZES_FAILURE:
    case UPDATE_QUIZES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default quizReducer;

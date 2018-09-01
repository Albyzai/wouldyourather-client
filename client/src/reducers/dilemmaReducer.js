import {
  GET_DILEMMAS,
  GET_DILEMMA,
  CREATE_DILEMMA,
  DELETE_DILEMMA,
  DILEMMAS_LOADING
} from "../actions/types";

const initialState = {
  dilemmas: [],
  dilemma: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DILEMMA:
      return {
        ...state,
        dilemma: action.payload,
        loading: false
      };
    case GET_DILEMMAS:
      return {
        ...state,
        dilemmas: action.payload,
        loading: false
      };
    case CREATE_DILEMMA:
      return {
        ...state,
        dilemmas: [action.payload, ...state.dilemmas]
      };
    case DELETE_DILEMMA:
      return {
        ...state,
        dilemmas: state.dilemmas.filter(
          dilemma => dilemma._id !== action.payload
        )
      };
    case DILEMMAS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

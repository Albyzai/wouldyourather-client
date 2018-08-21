import { GET_DILEMMAS, CREATE_DILEMMA, DELETE_DILEMMA, DILEMMAS_LOADING } from '../actions/types';

const initialState = {
  dilemmas: [],
  loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
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
        dilemmas: state.dilemmas.filter(dilemma => dilemma._id !== action.payload)
      };
    case DILEMMAS_LOADING:
    return {
      ...state,
      loading: true
    }
    default:
      return state;
  }
}
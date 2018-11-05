import axios from 'axios';
import {
  GET_DILEMMAS,
  GET_DILEMMA,
  DELETE_DILEMMA,
  DILEMMAS_LOADING,
  GET_ERRORS
} from './types';

//  Adds a like to a comment
export const addCommentLike = (id) => (dispatch) => {
  axios
    .post(`/api/comments/like/${id}`)
    .then((res) =>
      dispatch({
        type: GET_DILEMMA,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Adds a comment to a Dilemma
export const addComment = (commentData) => (dispatch) => {
  axios
    .post(`/api/comments`, commentData)
    .then((res) =>
      dispatch({
        type: GET_DILEMMA,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

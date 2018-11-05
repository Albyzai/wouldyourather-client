import axios from 'axios';
import {
  GET_DILEMMAS,
  GET_DILEMMA,
  DELETE_DILEMMA,
  DILEMMAS_LOADING,
  GET_ERRORS
} from './types';

// Returns a random Dilemma
export const getDilemma = () => (dispatch) => {
  dispatch(setDilemmasLoading());
  axios.get('/api/dilemmas').then((res) =>
    dispatch({
      type: GET_DILEMMA,
      payload: res.data
    })
  );
};

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

// Adds a vote
export const addVote = (id, color) => (dispatch) => {
  axios
    .post(`/api/dilemmas/${color}/${id}`)
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

// Add like
export const addLike = (id) => (dispatch) => {
  axios
    .post(`/api/dilemmas/like/${id}`)
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

// Remove like
export const removeLike = (id) => (dispatch) => {
  axios
    .post(`/api/dilemmas/unlike/${id}`)
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

// Returns all Dilemmas
export const getDilemmas = () => (dispatch) => {
  dispatch(setDilemmasLoading());
  axios.get('/api/dilemmas/all').then((res) =>
    dispatch({
      type: GET_DILEMMAS,
      payload: res.data
    })
  );
};

// Creates a Dilemma
export const createDilemma = (dilemmaData, history) => (dispatch) => {
  axios
    .post('/api/dilemmas', dilemmaData)
    .then((res) => history.push('/'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Deletes dilemma with specified ID
export const deleteDilemma = (id) => (dispatch) => {
  axios.delete(`/api/dilemmas/${id}`).then((res) =>
    dispatch({
      type: DELETE_DILEMMA,
      payload: id
    })
  );
};

// Sets dilemma to loading (for spinner)
export const setDilemmasLoading = () => {
  return {
    type: DILEMMAS_LOADING
  };
};

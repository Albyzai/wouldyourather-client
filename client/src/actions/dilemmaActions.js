import axios from 'axios';
import { GET_DILEMMAS, CREATE_DILEMMA, DELETE_DILEMMA, DILEMMAS_LOADING} from './types';

export const getDilemmas = () => dispatch => {
  dispatch(setDilemmasLoading());
  axios.get('/api/dilemmas').then(res =>
      dispatch({
        type: GET_DILEMMAS,
        payload: res.data
      })
    );
};

export const createDilemma = (dilemma) => dispatch => {
  axios.post('/api/dilemmas', dilemma)
    .then(res => dispatch({
      type: CREATE_DILEMMA,
      payload: res.data
    })
  );
};

export const deleteDilemma = (id) => dispatch => {
  axios.delete(`/api/dilemmas/${id}`).then(res =>
    dispatch({
      type: DELETE_DILEMMA,
      payload: id
    })
  );
};

export const setDilemmasLoading = () => {
  return {
    type: DILEMMAS_LOADING
  }
}
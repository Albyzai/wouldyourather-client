import { combineReducers } from 'redux';
import dilemmaReducer from './dilemmaReducer';

export default combineReducers({
  dilemma: dilemmaReducer
});


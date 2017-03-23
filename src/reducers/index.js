import { combineReducers } from 'redux';
import AnimalsReducer from './reducer-animals';

const rootReducer = combineReducers({
  animals: AnimalsReducer
});

export default rootReducer;

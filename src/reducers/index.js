import { combineReducers } from 'redux';
import AnimalsReducer from './reducer-animals';
import SightingsReducer from './reducer-sightings';

const rootReducer = combineReducers({
  animals: AnimalsReducer,
  sightings: SightingsReducer,
});

export default rootReducer;

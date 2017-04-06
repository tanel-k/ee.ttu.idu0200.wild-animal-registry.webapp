import {
    SEARCH_ANIMALS,
    FETCH_ANIMAL,
    ADD_SIGHTING,
    UPDATE_ANIMAL
} from '../actions/index';

const DEFAULT_STATE = {
    found: [],
    currentAnimal: null,
}

export default function(state=DEFAULT_STATE, action) {
    const { currentAnimal } = state;
    switch (action.type) {
        case SEARCH_ANIMALS:
            const found = action.payload.data || [];
            return { ...state, found: action.payload.data };
        /*case FETCH_ANIMAL:
            return 
        case ADD_SIGHTING:
            const { sightings } = currentAnimal;
            const newSighting = Object.assign({}, action.payload);
            
            newSighting.id = SIGHTING_ID_TMP++;
            return { ...state, currentAnimal: { ...currentAnimal, sightings: [newSighting, ...sightings] } };
        case UPDATE_ANIMAL:
            return { ...state, currentAnimal: { ...currentAnimal, ...action.payload }};
        */
        default:
            return state;
    }
}

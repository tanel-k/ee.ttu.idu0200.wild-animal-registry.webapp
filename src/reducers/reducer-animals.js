import {
    SEARCH_ANIMALS,
    FETCH_ANIMAL,
    FETCH_ANIMAL_SIGHTINGS,

    UPDATE_ANIMAL,
    DELETE_ANIMAL,

    CREATE_SIGHTING,
    FETCH_SIGHTING,
    DELETE_SIGHTING,
    UPDATE_SIGHTING,
} from '../actions/index';

const DEFAULT_STATE = {
    found: [],
    currentAnimal: null,
    currentAnimalSightings: [],
}

export default function(state=DEFAULT_STATE, action) {
    let {
        currentAnimal,
        currentAnimalSightings,
        found
    } = state;
    switch (action.type) {
        case SEARCH_ANIMALS:
            found = action.payload.data || [];
            return { ...state, found: action.payload.data };
        case FETCH_ANIMAL:
            return { ...state, currentAnimal: action.payload.data };
        case FETCH_ANIMAL_SIGHTINGS:
            currentAnimalSightings = action.payload.data || [];
            return { ...state, currentAnimalSightings };
        case DELETE_ANIMAL:
            return { ...state, found: [], currentAnimal: null, currentAnimalSightings: [] };
        case UPDATE_ANIMAL:
            if (!action.error)
                return { ...state, currentAnimal: action.payload.data };
            return state;
        case DELETE_SIGHTING:
            currentAnimalSightings = state.currentAnimalSightings.filter(s => s.id !== action.sightingId);
            return { ...state, currentAnimalSightings };
        case UPDATE_SIGHTING:
            const sighting = action.payload.data;
            const sightingIndex = currentAnimalSightings.findIndex(s => s.id === sighting.id);
            return { ...state, currentAnimalSightings: [
                ...currentAnimalSightings.slice(0, sightingIndex),
                sighting,
                ...currentAnimalSightings.slice(sightingIndex + 1)
            ]};
            return state;
        default:
            return state;
    }
}

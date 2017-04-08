import {
    FETCH_SIGHTINGS,
} from '../actions/index';

const DEFAULT_STATE = {
    all: [],
}

export default function(state=DEFAULT_STATE, action) {
    switch (action.type) {
        case FETCH_SIGHTINGS:
            return { ...state, all: action.payload.data };
        default:
            return state;
    }
}
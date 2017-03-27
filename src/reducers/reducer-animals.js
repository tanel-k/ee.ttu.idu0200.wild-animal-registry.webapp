import { FETCH_ANIMAL, ADD_SIGHTING, UPDATE_ANIMAL } from '../actions/index';

let SIGHTING_ID_TMP = 0;

const DEFAULT_STATE = {
    all: [
    {
        name: 'Jazz',
        species: 'Neutered hare',
        sightings: [
            {
                id: SIGHTING_ID_TMP++,
                date: new Date(),
                location: {
                    lat: 37.774929,
                    lng: -122.419416
                }
            },
            {
                id: SIGHTING_ID_TMP++,
                date: new Date(),
                location: {
                    lat: 37.774929,
                    lng: -122.419416
                }
            },
        ]
    },
    {
        name: 'Buzz',
        species: 'Wild arse fly',
        sightings: [
            {
                id: SIGHTING_ID_TMP++,
                date: new Date(),
                location: {
                    lat: 37.774929,
                    lng: -122.419416
                }
            },
            {
                id: SIGHTING_ID_TMP++,
                date: new Date(),
                location: {
                    lat: 37.774929,
                    lng: -122.419416
                }
            },
        ]
    },
    {
        name: 'Buck',
        species: 'Dry land dolphin',
        sightings: [
            {
                id: SIGHTING_ID_TMP++,
                date: new Date(),
                location: {
                    lat: 37.774929,
                    lng: -122.419416
                }
            },
            {
                id: SIGHTING_ID_TMP++,
                date: new Date(),
                location: {
                    lat: 37.774929,
                    lng: -122.419416
                }
            },
        ]
    }],
    currentAnimal: null
}

export default function(state, action) {
    console.log(state);
    if (!state) state=DEFAULT_STATE;
    const { currentAnimal } = state;
    switch (action.type) {
        case FETCH_ANIMAL:
            return { ...state, currentAnimal: findAnimal(state.all, action.payload) };
        case ADD_SIGHTING:
            const { sightings } = currentAnimal;
            const newSighting = Object.assign({}, action.payload);
            
            newSighting.id = SIGHTING_ID_TMP++;
            return { ...state, currentAnimal: { ...currentAnimal, sightings: [newSighting, ...sightings] } };
        case UPDATE_ANIMAL:
            return { ...state, currentAnimal: { ...currentAnimal, ...action.payload }};
        default:
            return state;
    }
}

function findAnimal(all, name) {
    // TODO: remove
    return all.find(animal => animal.name === name);
}

export const FETCH_ANIMAL = 'FETCH_ANIMAL';
export const ADD_SIGHTING = 'ADD_SIGHTING';
export const UPDATE_ANIMAL = 'CHANGE_ANIMAL';

export function fetchAnimal(name) {
    // TODO: Axios
    return {
        type: FETCH_ANIMAL,
        payload: name
    }
}

export function addSighting(animalName, sighting) {
    // TODO: Axios
    return {
        type: ADD_SIGHTING,
        payload: sighting
    }
}

export function updateAnimal(animalName, updates) {
    // TODO: Axios
    return {
        type: UPDATE_ANIMAL,
        payload: updates
    }
}
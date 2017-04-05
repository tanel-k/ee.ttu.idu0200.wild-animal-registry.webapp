export const FETCH_SIGHTING = 'FETCH_SIGHTING';
export const CREATE_SIGHTING = 'ADD_SIGHTING';
export const UPDATE_SIGHTING = 'UPDATE_SIGHTING';
export const DELETE_SIGHTING = 'DELETE_SIGHTING';

export const FETCH_ANIMAL = 'FETCH_ANIMAL';
export const CREATE_ANIMAL = 'CREATE_ANIMAL';
export const UPDATE_ANIMAL = 'CHANGE_ANIMAL';
export const DELETE_ANIMAL = 'DELETE_ANIMAL';

export function fetchAnimal(slug) {
    // TODO: Axios
    return {
        type: FETCH_ANIMAL,
        payload: slug
    }
}

export function createAnimal(animalData) {
    // TODO: Axios
    return {
        type: CREATE_ANIMAL,
        payload: animalData
    }
}

export function updateAnimal(slug, updates) {
    // TODO: Axios
    return {
        type: UPDATE_ANIMAL,
        payload: updates
    }
}

export function deleteAnimal(slug) {
    // TODO: Axios
    return {
        type: DELETE_ANIMAL,
        payload: slug
    }
}

export function fetchSighting(id) {
    // TODO: Axios
    return {
        type: FETCH_SIGHTING,
        payload: name
    }
}

export function createSighting(animalSlug, sighting) {
    // TODO: Axios
    return {
        type: CREATE_SIGHTING,
        payload: sighting
    }
}

export function updateSighting(sightingId, updates) {
    // TODO: Axios
    return {
        type: UPDATE_SIGHTING,
        payload: updates
    }
}

export function deleteSighting(id) {
    // TODO: Axios
    return {
        type: DELETE_SIGHTING,
        payload: id
    }
}
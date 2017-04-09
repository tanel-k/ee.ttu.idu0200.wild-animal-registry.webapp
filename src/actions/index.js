import axios from 'axios'

export const SEARCH_ANIMALS = 'SEARCH_ANIMALS';

export const FETCH_SIGHTINGS = 'FETCH_SIGHTINGS';

export const FETCH_ANIMAL = 'FETCH_ANIMAL';
export const FETCH_ANIMAL_SIGHTINGS = 'FETCH_ANIMAL_SIGHTINGS';
export const CREATE_ANIMAL = 'CREATE_ANIMAL';
export const UPDATE_ANIMAL = 'CHANGE_ANIMAL';
export const DELETE_ANIMAL = 'DELETE_ANIMAL';

export const FETCH_SIGHTING = 'FETCH_SIGHTING';
export const CREATE_SIGHTING = 'ADD_SIGHTING';
export const UPDATE_SIGHTING = 'UPDATE_SIGHTING';
export const DELETE_SIGHTING = 'DELETE_SIGHTING';

const ROOT_URL = 'https://wild-animal-registry.herokuapp.com/api';

export function searchAnimals(nameOrSpecies='') {
    const request = axios.get(`${ROOT_URL}/animals?name_or_species=${nameOrSpecies}`);
    return {
        type: SEARCH_ANIMALS,
        payload: request
    };
}
export function fetchAnimal(id) {
    const request = axios.get(`${ROOT_URL}/animals/${id}`);
    return {
        type: FETCH_ANIMAL,
        payload: request
    };
}

export function fetchAnimalSightings(id) {
    const request = axios.get(`${ROOT_URL}/animals/${id}/sightings`);
    return {
        type: FETCH_ANIMAL_SIGHTINGS,
        payload: request
    };
}

export function createAnimal(data) {
    const request = axios.post(`${ROOT_URL}/animals`, data);
    return {
        type: CREATE_ANIMAL,
        payload: request
    };
}

export function updateAnimal(id, data) {
    const request = axios.put(`${ROOT_URL}/animals/${id}`, data);
    return {
        type: UPDATE_ANIMAL,
        payload: request
    };
}

export function deleteAnimal(id) {
    const request = axios.delete(`${ROOT_URL}/animals/${id}`);
    return {
        type: DELETE_ANIMAL,
        meta: { id },
        payload: request
    };
}

export function fetchSighting(id) {
    const request = axios.get(`${ROOT_URL}/sightings/${id}`);
    return {
        type: FETCH_SIGHTING,
        payload: request
    };
}

export function createSighting(animalId, data) {
    const request = axios.post(`${ROOT_URL}/animals/${animalId}/sightings`, data);
    return {
        type: CREATE_SIGHTING,
        payload: request
    };
}

export function updateSighting(id, updates) {
    const request = axios.put(`${ROOT_URL}/sightings/${id}`, updates);
    return {
        type: UPDATE_SIGHTING,
        payload: request,
    };
}

export function deleteSighting(id) {
    const request = axios.delete(`${ROOT_URL}/sightings/${id}`);
    return {
        type: DELETE_SIGHTING,
        meta: { id },
        payload: request
    };
}

export function fetchSightings() {
    const request = axios.get(`${ROOT_URL}/sightings`);
    return {
        type: FETCH_SIGHTINGS,
        payload: request,
    }
}
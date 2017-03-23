const DEFAULT_STATE = {
    all: [{
        name: 'Dingo',
        species: 'Wild dingo',
        sightings: [
            {
                date: new Date(),
                location: {
                    lat: 0,
                    lon: 0,
                    humanReadableName: 'Tallinn'
                }
            },
            {
                date: new Date(),
                location: {
                    lat: 0,
                    lon: 0,
                    humanReadableName: 'Tallinn'
                }
            },
        ]
    }],
    currentAnimal: null
}

export default function(state=DEFAULT_STATE, action) {
    switch (action.type) {
        default:
            return state;
    }
}
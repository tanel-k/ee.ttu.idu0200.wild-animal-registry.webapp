import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import AnimalCreator from './components/animal-creator';
import AnimalIndex from './components/animal-index';
import AnimalDetail from './components/animal-detail';
import SightingCreator from './components/sighting-creator';
import SightingsMap from './components/sightings-map';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={AnimalIndex} />
        <Route path='animals/new' component={AnimalCreator} />
        <Route path='animals/:name' component={AnimalDetail} />
        <Route path='animals/:name/sightings/new' component={SightingCreator} />
        <Route path='sightings' component={SightingsMap} />
    </Route>
);
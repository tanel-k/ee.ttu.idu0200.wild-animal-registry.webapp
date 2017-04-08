import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import AnimalCreator from './containers/animal-creator';
import AnimalIndex from './containers/animal-index';
import AnimalDetail from './containers/animal-detail';
import SightingCreator from './containers/sighting-creator';
import SightingsMap from './containers/sightings-map';
import NotFoundPage from './components/404';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={AnimalIndex} />
        <Route path='animals/new' component={AnimalCreator} />
        <Route path='animals/:id' component={AnimalDetail} />
        <Route path='animals/:id/sightings/new' component={SightingCreator} />
        <Route path='sightings' component={SightingsMap} />
        <Route path='notfound' component={NotFoundPage} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);
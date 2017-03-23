import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import AnimalCreator from './components/animal-creator';
import AnimalSearch from './components/animal-search';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={AnimalSearch} />
        <Route path="animals/create" component={AnimalCreator} />
    </Route>
);
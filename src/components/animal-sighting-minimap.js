import React, { Component, PropTypes } from 'react';

import {
    GoogleApiComponent,
    Map,
    Marker,
} from '../lib/google-maps/index';
import { GOOGLE_MAPS_KEY } from '../consts/api-keys';

class AnimalSightingMinimap extends Component {
    render() {
        if (!this.props.loaded) {
            return (
                <div>Loading...</div>
            );
        }

        const {
            location
        } = this.props;

        return (
            <Map draggable={false} zoom={10} height='200px' width='200px' google={this.props.google} center={location}>
                <Marker position={location} />
            </Map>
        );
    }
}

AnimalSightingMinimap.propTypes = {
    location: PropTypes.object.isRequired
}

export default GoogleApiComponent({
    apiKey: GOOGLE_MAPS_KEY
})(AnimalSightingMinimap);
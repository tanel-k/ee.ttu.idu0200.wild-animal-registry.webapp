import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import {
    GoogleApiComponent,
    Map,
    Marker,
} from '../lib/google-maps/index';
import { GOOGLE_MAPS_KEY } from '../consts/api-keys';

import { format as formatDate } from '../lib/utils/date-utils';

class AnimalMiniDisplay extends Component {
    renderSighting(sighting) {
        if (!sighting)
            return (<span>Not sighted yet.</span>);
        
        return (
            <div>
                <h4>Last seen</h4>
                <div className='form-group'>
                    <label>Date</label>
                    <div>{formatDate(sighting.date, 'D MMM YYYY HH:mm')}</div>
                </div>
                <div className='form-group'>
                    <label>Location</label>
                    <Map 
                        disableScrollZoom={true} 
                        zoom={12} height='200px' 
                        google={this.props.google} 
                        center={sighting.location}
                    >
                        <Marker position={sighting.location} />
                    </Map>
                </div>
            </div>
        );
    }

    render() {
        if (!this.props.loaded || !this.props.animal) {
            return (
                <div>Loading...</div>
            );
        }

        const { animal } = this.props;
        const lastSighting = getLastSighting(animal.sightings);

        return (
            <div className='panel panel-info'>
                <div className='panel-heading'>
                    <h4 className='pull-left'>{animal.name}<small><em> {animal.species}</em></small></h4>
                    <Link to={`/animals/${animal.name}`} className='btn btn-primary pull-right'>View</Link>
                    <div className="clearfix"></div>
                </div>
                <div className='panel-body'>
                    {this.renderSighting(lastSighting)}
                </div>
            </div>
        );
    }
}

const getLastSighting = (sightings=[]) => (
    sightings.reduce((prev, curr) => {
        if (curr.date > prev.date) {
            return curr;
        }

        return prev;
    }, sightings[0])
);

export default GoogleApiComponent({
    apiKey: GOOGLE_MAPS_KEY
})(AnimalMiniDisplay);
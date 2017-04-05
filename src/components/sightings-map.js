import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import {
    GoogleApiComponent,
    Map,
    Marker,
    LocationSearch,
    MarkerInfoWindow,
} from '../lib/google-maps/index';
import { GOOGLE_MAPS_KEY } from '../consts/api-keys';

import { format as formatDate } from '../lib/utils/date-utils';

const defaultCenterCoords = { lat: 37.774929, lng: -122.419416 };

class SightingsMap extends Component {
    constructor(props) {
        super(props);

        let state = { center: defaultCenterCoords };
        this.state = state;

        this.renderMarkers = this.renderMarkers.bind(this);
        this.handleLocationSearch = this.handleLocationSearch.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.loaded && this.props.loaded) {
            // when google is present
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                        const coords = pos.coords;

                        this.setState({
                            center: {
                                lat: coords.latitude,
                                lng: coords.longitude
                            }
                        });
                    },

                    // 403 on Chrome if not serving over HTTPS
                    (err) => console.log(err)
                );
            }
        }
    }

    handleLocationSearch(center) {
        this.setState({ center });
    }

    renderMarkers() {
        return this.props.sightings.map(sighting => (
            <Marker key={sighting.id} position={sighting.position}>
                <MarkerInfoWindow>
                    <div>
                        <h5>
                            <a href={`/animals/${sighting.animal.slug}`} className='btn btn-link display-inline'>
                                {sighting.animal.name} <small>{sighting.animal.species}</small>
                            </a>
                        </h5>
                        <div className='form-group'>
                            <label>Date</label>
                            <div>
                                {formatDate(sighting.date, 'D MMM YYYY HH:mm')}
                            </div>
                        </div>
                    </div>
                </MarkerInfoWindow>
            </Marker>
        ));
    }

    render() {
        if (!this.props.loaded) {
            return (
                <div>
                    Loading...
                </div>
            );
        }

        return (
            <div>
                <h3>Sightings Map</h3>
                <div className='row'>
                    <div className='col-md-12'>
                        <LocationSearch 
                            google={this.props.google} 
                            handlePositionChanged={this.handleLocationSearch}
                        />
                        <Map 
                            google={this.props.google}
                            center={this.state.center}
                            zoom={15}
                        >
                            {this.renderMarkers()}
                        </Map>
                    </div>
                </div>
            </div>
        );
    }
}

SightingsMap.propTypes = {
    sightings: PropTypes.arrayOf(PropTypes.object),
};

SightingsMap.defaultProps = {
    sightings: [],
};

export default GoogleApiComponent({
    apiKey: GOOGLE_MAPS_KEY
})(SightingsMap);
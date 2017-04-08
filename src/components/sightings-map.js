import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import {
    fetchSightings,
} from '../actions/index';

import {
    GoogleApiComponent,
    Map,
    Marker,
    LocationSearch,
    MarkerInfoWindow,
} from '../lib/google-maps/index';
import { GOOGLE_MAPS_KEY } from '../consts/api-keys';

import { format as formatDate } from '../lib/utils/date-utils';

const defaultCenter = { lat: 37.774929, lng: -122.419416 };

class SightingsMap extends Component {
    constructor(props) {
        super(props);

        let state = {
            center: defaultCenter,
            loadingMarkers: true
        };
        this.state = state;

        this.renderMarkers = this.renderMarkers.bind(this);
        this.handleLocationSearch = this.handleLocationSearch.bind(this);
    }

    componentWillMount() {
        this.props.fetchSightings()
            .then(this.setState({ loadingMarkers: false }))
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
            <Marker key={sighting.id} position={{
                lat: sighting.latitude,
                lng: sighting.longitude,
            }}>
                <MarkerInfoWindow>
                    <div>
                        <h5>
                            <a href={`/animals/${sighting.animal.id}`} className='btn btn-link display-inline'>
                                {sighting.animal.name} <small>{sighting.animal.species}</small>
                            </a>
                        </h5>
                        <div className='form-group'>
                            <label>Date</label>
                            <div>
                                {formatDate(sighting.dttm, 'D MMM YYYY HH:mm')}
                            </div>
                        </div>
                    </div>
                </MarkerInfoWindow>
            </Marker>
        ));
    }

    render() {
        if (!this.props.loaded || this.state.loadingMarkers) {
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
                            height={'400px'}
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

const mapStateToProps = (state) =>({
    sightings: state.sightings.all,
});

SightingsMap = connect(mapStateToProps, {
    fetchSightings,
})(SightingsMap);

export default GoogleApiComponent({
    apiKey: GOOGLE_MAPS_KEY
})(SightingsMap);
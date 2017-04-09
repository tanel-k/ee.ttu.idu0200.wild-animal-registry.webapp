import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { DateTimePicker } from 'react-widgets';

import {
    createSighting,
} from '../actions/index';

import {
    GoogleApiComponent,
    Map,
    MoveableMarker,
    LocationSearch
} from '../lib/google-maps/index';
import { GOOGLE_MAPS_KEY } from '../consts/api-keys';

const defaultCenter = {
    lat: 37.774929,
    lng: -122.419416
};

class SightingCreator extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            mapCenter: defaultCenter,
            location: defaultCenter,
            isAdding: false,
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleLocationSearch = this.handleLocationSearch.bind(this);
        this.handleMarkerMoved = this.handleMarkerMoved.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.loaded && this.props.loaded) {
            // when google is present
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                        const coords = pos.coords;

                        this.setState({
                            mapCenter: {
                                lat: coords.latitude,
                                lng: coords.longitude
                            },
                            location: {
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

    handleLocationSearch(location) {
        this.setState({
            location,
            mapCenter: location
        });
    }

    handleMarkerMoved(location) {
        this.setState({ location });
    }

    handleDateChange(date, dateStr) {
        if (date) {
            this.setState({ date });
        }
    }

    handleAdd(event) {
        event.preventDefault();
        this.setState({ isAdding: true });
        this.props.createSighting(this.props.params.id, {
            dttm: this.state.date,
            latitude: this.state.location.lat,
            longitude: this.state.location.lng,
        }).then(() => this.context.router.push(`/animals/${this.props.params.id}`));
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
            <div className='container'>
                <div className='row mt-1'>
                    <div className='col-sm-12'>
                        <h3>Add sighting</h3>
                        <form onSubmit={this.handleAdd}>
                            <div className='form-group'>
                                <label>Date</label>
                                <DateTimePicker
                                    format='D MMM YYYY HH:mm'
                                    editFormat='MM-DD-YYYY HH:mm'
                                    value={this.state.date}
                                    onChange={this.handleDateChange.bind(this)}
                                />
                            </div>

                            <div className='form-group'>
                                <label>Location</label>
                                <LocationSearch google={this.props.google} handlePositionChanged={this.handleLocationSearch}/>
                                <Map google={this.props.google} center={this.state.mapCenter}>
                                    <MoveableMarker position={this.state.location} handleMarkerMoved={this.handleMarkerMoved} />
                                </Map>
                            </div>

                            <button
                                type='submit'
                                className='btn btn-block btn-primary'
                                disabled={this.state.isAdding}
                            >Add</button>
                            <Link
                                to={`/animals/${this.props.params.id}`}
                                className='btn btn-block btn-default'
                                disabled={this.state.isAdding}
                            >Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

SightingCreator = connect(null, {
    createSighting 
})(SightingCreator);

export default GoogleApiComponent({
    apiKey: GOOGLE_MAPS_KEY
})(SightingCreator);

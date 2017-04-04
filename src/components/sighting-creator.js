import React, { Component } from 'react';
import { Link } from 'react-router';

import { DateTimePicker } from 'react-widgets';

import {
    GoogleApiComponent,
    Map,
    MoveableMarker,
    LocationSearch
} from '../lib/google-maps/index';
import { GOOGLE_MAPS_KEY } from '../consts/api-keys';

class SightingCreator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            mapCenter: {
                lat: 37.774929,
                lng: -122.419416
            },
            location: {
                lat: 37.774929,
                lng: -122.419416
            },
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleLocationSearch = this.handleLocationSearch.bind(this);
        this.handleMarkerMoved = this.handleMarkerMoved.bind(this);
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
        if (date)
            this.setState({ date });
    }

    handleAdd(event) {
        event.preventDefault();
        this.props.handleNewSighting(this.state);
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

                            <button type="submit" className="btn btn-block btn-success">Add</button>
                            <Link to={`/animals/${name}`} className="btn btn-block btn-default">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default GoogleApiComponent({
    apiKey: GOOGLE_MAPS_KEY
})(SightingCreator);

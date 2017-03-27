import React, { Component } from 'react';

import {
    GoogleApiComponent,
    Map,
    MoveableMarker,
    LocationSearch
} from '../lib/google-maps/index';
import { GOOGLE_MAPS_KEY } from '../consts/api-keys';

class AnimalSightingForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: null,
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

    handleLocationSearch(position) {
        this.setState({
            mapCenter: position,
            location: position,
        });
    }

    handleMarkerMoved(position) {
        this.setState({
            location: position
        });
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
            <div className="row mt-1">
                <div className="col-sm-12">
                    <h3>Add sighting</h3>
                    <form onSubmit={this.handleAdd}>
                        <div className='form-group'>
                            <label>Date</label>
                            <input onChange={e => this.handleDateChange(e)} type="date" value={this.state.date} className='form-control'/>
                        </div>

                        <div className='form-group'>
                            <label>Location</label>
                            <LocationSearch google={this.props.google} handlePositionChanged={this.handleLocationSearch}/>
                            <Map google={this.props.google} center={this.state.mapCenter}>
                                <MoveableMarker position={this.state.location} handleMarkerMoved={this.handleMarkerMoved} />
                            </Map>
                        </div>

                        <button type="submit" className="btn btn-success">Add</button>
                    </form>
                </div>
            </div>
        );
    }

    handleAdd(event) {
        event.preventDefault();
        this.props.handleNewSighting(this.state);
    }

    handleDateChange(event) {
        this.setState({
            date: event.target.value
        });
    }
}

export default GoogleApiComponent({
    apiKey: GOOGLE_MAPS_KEY
})(AnimalSightingForm);
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { DateTimePicker } from 'react-widgets';

import {
    GoogleApiComponent,
    Map,
    Marker,
    MoveableMarker,
    LocationSearch,
} from '../lib/google-maps/index';
import { GOOGLE_MAPS_KEY } from '../consts/api-keys';

class SightingInlineEditor extends Component {
    constructor(props) {
        super(props);
        const { location, date } = props.sighting;
        this.state = { location, date };

        this.handleLocationSearch = this.handleLocationSearch.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleMarkerMoved = this.handleMarkerMoved.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    handleSave() {
        console.warn("save not implemented yet!");
    }

    handleDelete() {
        console.warn("delete not implemented yet!");
    }

    render() {
        if (!this.props.loaded) {
            return (
                <div>Loading...</div>
            );
        }

        const {
            sighting,
        } = this.props;

        return (
            <div className='panel panel-info'>
                <div className='panel-heading'>
                    <h4>Sighting <small><em>id: {sighting.id}</em></small></h4>
                </div>
                <div className='panel-body'>
                    <div className='form-group'>
                        <label>Date</label>
                        <DateTimePicker
                            format='D MMM YYYY HH:mm'
                            editFormat='MM-DD-YYYY HH:mm'
                            value={this.state.date}
                            onChange={this.handleDateChange}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Location</label>
                        <LocationSearch 
                            google={this.props.google} 
                            handlePositionChanged={this.handleLocationSearch}
                        />
                        <Map zoom={10} 
                            height='200px' 
                            google={this.props.google} 
                            center={this.state.location}
                        >
                            <MoveableMarker 
                                position={this.state.location} 
                                handleMarkerMoved={this.handleMarkerMoved} 
                            />
                        </Map>
                    </div>

                    <button className='btn btn-block btn-success' 
                        onClick={this.handleSave}>Save</button>
                    <button className='btn btn-block btn-danger' 
                        onClick={this.handleDelete}>Delete</button>
                </div>
            </div>
        );
    }
}

SightingInlineEditor.propTypes = {
    handleSave: PropTypes.func,
    handleDelete: PropTypes.func,
};

SightingInlineEditor.defaultProps = {
    handleSave: () => {},
    handleDelete: () => {},
};

export default GoogleApiComponent({
    apiKey: GOOGLE_MAPS_KEY
})(SightingInlineEditor);

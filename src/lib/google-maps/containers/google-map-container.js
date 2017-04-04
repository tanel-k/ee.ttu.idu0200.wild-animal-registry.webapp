import React, { Component } from 'react';

import GoogleApiComponent from '../utils/google-api-component';
import Map from '../components/google-map';
import Marker from '../components/marker';
import MoveableMarker from '../components/moveable-marker';
import MarkerInfoWindow from '../components/marker-info-window';
import LocationSearch from '../components/location-search';

const API_KEY = 'AIzaSyBoeESaWvaoZaKmNV1eSrLKz7yLNgwXGLY';

class GoogleMapContainer extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            center: {
                lat: 37.774929,
                lng: -122.419416
            },
            moveableMarkerPosition: {
                lat: 37.774929,
                lng: -122.419416
            }
        }
    }

    render() {
        if (!this.props.loaded) {
            return (
                <div>
                    Loading...
                </div>
            );
        }
        const pos = {lat: 37.774929, lng: -122.419416};

        return (
            <div>
                <LocationSearch google={this.props.google} handlePositionChanged={(position) => {this.setState({ center: position, moveableMarkerPosition: position })}}/>
                <Map google={this.props.google} center={this.state.center}>
                    <MoveableMarker position={this.state.moveableMarkerPosition} handleMarkerMoved={(newPosition) => { console.log(newPosition); }}>
                        <MarkerInfoWindow>
                            <div>Distinct random content</div>
                        </MarkerInfoWindow>
                    </MoveableMarker>
                </Map>
            </div>
        );
    }
}

export default GoogleApiComponent({
    apiKey: API_KEY
})(GoogleMapContainer);
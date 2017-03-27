import React, { Component, PropTypes } from 'react';

import { camelize } from '../utils/string-utils';

const evtTypes = ['click', 'mousedown', 'mouseover'];

class Marker extends Component {
    componentDidUpdate(prevProps) {
        if (this.map !== prevProps.map)
            this.renderMarker();
    }

    componentWillUnmount() {
        if (this.marker) {
            this.marker.setMap(null);
        }
    }

    initializeMarker(position) {
        const { map, google } = this.props;
        const pref = { map, position };

        this.marker = new google.maps.Marker(pref);

        evtTypes.forEach((evtType) => {
            this.marker.addListener(evtType, this.handleEvent(evtType))
        });
    }

    renderMarker() {
        let {
            map, google, position,
        } = this.props;

        if (map && google) {
            position = new google.maps.LatLng(position.lat, position.lng);

            this.marker 
                ? this.marker.setPosition(position)
                : this.initializeMarker(position);
        }
    }

    renderChildren() {
        const { children } = this.props;

        if (!children) return;

        return React.Children.map(children, c => (
            React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                marker: this.marker,
            })
        ));
    }

    handleEvent(evtType) {
        const handlerName = `on${camelize(evtType)}`;

        return (event) => {
            if (this.props[handlerName]) {
                this.props[handlerName](this.props, this.map, event);
            }
        }
    }

    render() {
        this.renderMarker();

        return (
            <div>
                {this.renderChildren()}
            </div>
        );
    }
}

Marker.propTypes = {
    position: PropTypes.object.isRequired,
    map: PropTypes.object,
}

export default Marker;

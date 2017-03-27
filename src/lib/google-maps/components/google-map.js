import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { camelize } from '../utils/string-utils';
import { equalPositions } from '../utils/position-utils';

const evtTypes = ['click'];
const markerEvtTypes = ['click'];

class GoogleMap extends Component {
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }

        if (!equalPositions(this.props.center, prevProps.center)) {
            this.recenterMap();
        }
    }

    recenterMap() {
        const map = this.map;
        const curr = this.props.center;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);
            map.panTo(center);
        }
    }

    handleEvent(evtType) {
        const handlerName = `on${camelize(evtType)}`;

        return (event) => {
            if (this.props[handlerName]) {
                this.props[handlerName](this.props, this.map, event);
            }
        }
    }

    componentDidMount() {
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let {
                center,
                zoom,
                draggable,
                streetViewControl,
                disableDoubleClickZoom
            } = this.props;

            center = new maps.LatLng(center.lat, center.lng);
            const mapCfg = Object.assign({}, {
                center,
                zoom,
                draggable,
                streetViewControl,
                disableDoubleClickZoom,
            });

            this.map = new maps.Map(node, mapCfg);

            evtTypes.forEach(evtType => {
                this.map.addListener(evtType, this.handleEvent(evtType));
            });

            // force re-render
            this.forceUpdate();
        }
    }

    renderChildren() {
        const { children } = this.props;

        if (!children) return;

        return React.Children.map(children, c => (
            React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
            })
        ));
    }

    render() {
        const { width, height } = this.props;

        return (
            <div style={{ width, height }} ref='map'>
                Loading map...
                {this.renderChildren()}
            </div>
        );
    }
}

GoogleMap.propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    center: PropTypes.object,
    width: PropTypes.string,
    height: PropTypes.string,
    draggable: PropTypes.bool,
    streetViewControl: PropTypes.bool,
    disableDoubleClickZoom: PropTypes.bool,
}

evtTypes.forEach(evtType => GoogleMap.propTypes[`on${camelize(evtType)}`] = React.PropTypes.func);

GoogleMap.defaultProps = {
    zoom: 14,
    width: '100%',
    height: '300px',
    draggable: true,
    streetViewControl: false,
    disableDoubleClickZoom: true,
}

export default GoogleMap;
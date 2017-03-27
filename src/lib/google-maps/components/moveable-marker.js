import React, { Component, PropTypes } from 'react';

import Marker from './marker';
import { equalPositions } from '../utils/position-utils';

class MoveableMarker extends Component {
    constructor(props) {
        super(props);

        const { position } = props;

        this.state = { position };
    }

    componentDidUpdate(prevProps, prevState) {
        const { map, position } = this.props;

        if (map !== prevProps.map) {
            if (map) {
                map.addListener('rightclick', this.handleMapRightClick());
            }
        }

        if (!equalPositions(this.state.position, prevState.position)) {
            this.props.handleMarkerMoved(this.state.position);
        }

        if (!equalPositions(position, prevProps.position)) {
            this.handlePropsReposition();
        }
    }

    handlePropsReposition() {
        const { position } = this.props;
        this.setState({ position });
    }

    handleMapRightClick() {
        return (event) => {
            const position = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };

            this.setState({ position });
        }
    }

    render() {
        return (
            <Marker { ...this.props } position={ this.state.position } />
        );
    }
}

MoveableMarker.propTypes = {
    position: PropTypes.object.isRequired,
    handleMarkerMoved: PropTypes.func,
}

MoveableMarker.defaultProps = {
    handleMarkerMoved: () => {},
}

export default MoveableMarker;

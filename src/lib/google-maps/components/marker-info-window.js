import React, { Component, PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';

import { camelize } from '../utils/string-utils';

const evtTypes = ['closeclick'];

class MarkerInfoWindow extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            visible: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.map !== prevProps.map)
            this.renderInfoWindow();      

        if (this.props.children !== prevProps.children)
            this.updateContent();

        if (this.state.visible !== prevState.visible)
            this.updateVisibility();

        if (this.props.marker !== prevProps.marker) {
            this.props.marker.addListener('click', () => { this.toggleVisibility() });
        }
    }

    updateContent() {
        const content = this.renderChildren();
        this.infoWindow.setContent(content);
    }

    renderChildren() {
        const { children } = this.props;
        return ReactDOMServer.renderToString(children);
    }

    updateVisibility() {
        this.state.visible
            ? this.openWindow()
            : this.closeWindow();
    }

    toggleVisibility() {
        this.setState({
            visible: !this.state.visible
        });
    }

    openWindow() {
        this.infoWindow.open(this.props.map, this.props.marker);
    }

    closeWindow() {
        this.infoWindow.close();
    }

    handleEvent(evtType) {
        const handlerName = `on${camelize(evtType)}`;

        return (event) => {
            if (this.props[handlerName]) {
                this.props[handlerName](this.props, this.map, event);
            }
        }
    }

    renderInfoWindow() {
        const { google, marker } = this.props;

        if (google && marker) {
            this.infoWindow = new google.maps.InfoWindow({
                content: this.renderChildren()
            });

            evtTypes.forEach((evtType) => {
                this.infoWindow.addListener(evtType, this.handleEvent(evtType))
            });

            this.infoWindow.addListener('closeclick', () => { this.setState({ visible: false }) });
        }

        return null;
    }

    render() {
        return this.renderInfoWindow();
    }
}

MarkerInfoWindow.propTypes = {
    map: PropTypes.object,
    marker: PropTypes.object,
    google: PropTypes.object,
}

export default MarkerInfoWindow;
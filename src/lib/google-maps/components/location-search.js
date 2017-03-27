import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class LocationSearch extends Component {
    componentDidUpdate(prevProps) {
        const { google, map } = this.props;
        if (google !== prevProps.google) {
            this.renderAutoComplete();
        }
    }

    componentDidMount() {
        this.renderAutoComplete();
    }

    renderAutoComplete() {
        const { google } = this.props;
        if (google) {
            const node = ReactDOM.findDOMNode(this.refs.autocomplete);

            let autocomplete = new google.maps.places.Autocomplete(node);
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (!place.geometry) {
                    return;
                }

                const position = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                };

                this.props.handlePositionChanged(position);
            });
        }
    }

    onKeyPress(event) {
        if (event.which === 13) {
            // prevent parent form submission on 'Enter'
            event.preventDefault();
        }
    }

    render() {
        return (
            <input 
                ref='autocomplete'
                onKeyPress={this.onKeyPress} 
                className={this.props.inputClassName} 
                type='text'
                placeholder={this.props.inputPlaceholder} 
            />
        );
    }
}

LocationSearch.propTypes = {
    google: PropTypes.object,
    handlePositionChanged: PropTypes.func,
    inputClassName: PropTypes.string,
    inputPlaceholder: PropTypes.string,
}

LocationSearch.defaultProps = {
    handlePositionChanged: () => {},
    inputClassName: 'form-control',
    inputPlaceholder: 'Search for a location',
}

export default LocationSearch;
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class LocationSearch extends Component {
    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

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
    
    handleSearch(event) {
        event.preventDefault();
        if (this.refs.autocomplete) {
            this.refs.autocomplete.focus();
        }
    }

    render() {
        return (
            <div className="input-group">
                <input 
                    ref='autocomplete' 
                    className={this.props.inputClassName} 
                    type='text'
                    placeholder={this.props.inputPlaceholder}
                    onKeyPress={this.onKeyPress}
                />
                <span className="input-group-btn">
                    <button 
                        className="btn btn-secondary" 
                        onClick={this.handleSearch}>Search</button>
                </span>
            </div>
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
import React, { Component, PropTypes } from 'react';

class AnimalSearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ''
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        this.props.handleSearch(this.state.searchTerm);
    }

    handleInputChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    render() {
        return (
            <form className="input-group" onSubmit={this.handleFormSubmit}>
                <input
                    placeholder="Name or species..."
                    className="form-control"
                    value={this.state.searchTerm} 
                    onChange={this.handleInputChange} 

                />
                <span className="input-group-btn">
                    <button
                        type="submit"
                        className="btn btn-secondary" 
                        disabled={this.props.disabled}
                    >Search</button>
                </span>
            </form>
        );
    }
}

AnimalSearchBar.propTypes = {
    disabled: PropTypes.bool,
    handleSearch: PropTypes.func,
};

AnimalSearchBar.defaultProps = {
    disabled: false,
    handleSearch: () => {},
};

export default AnimalSearchBar;
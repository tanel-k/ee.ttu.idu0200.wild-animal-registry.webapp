import React, { Component } from 'react';

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
                    <button type="submit" className="btn btn-secondary">Search</button>
                </span>
            </form>
        );
    }
}

export default AnimalSearchBar;
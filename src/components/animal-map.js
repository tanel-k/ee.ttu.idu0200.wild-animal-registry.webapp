import React, { Component } from 'react';

export default class AnimalMap {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            radius: 1
        }

        this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
        this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
        this.handleRadiusChange = this.handleRadiusChange.bind(this);
    }
    
    handleFormSubmit(event) {
        event.preventDefault();
        this.props.handleSearch(this.state.searchTerm);
    }

    handleLatitudeChange(event) {
        this.setState({
            latitude: event.target.value
        });

         console.log(this.state);
    }

    handleLongitudeChange(event) {
        this.setState({
            longitude: event.target.value
        });

         console.log(this.state);
    }

    handleRadiusChange(event) {
        this.setState({
            radius: event.target.value
        });

        console.log(this.state);
    }

    render() {
        return (
            <form className="input-group" onSubmit={this.handleFormSubmit}>
                <input
                    placeholder="Latitude"
                    className="form-control"
                    value={this.state.latitude} 
                    onChange={this.handleLatitudeChange} />

                <input
                    placeholder="Longitude"
                    className="form-control"
                    value={this.state.longitude} 
                    onChange={this.handleLongitudeChange} />

                <input
                    placeholder="Radius"
                    type="number"
                    className="form-control"
                    value={this.state.radius} 
                    onChange={this.handleRadiusChange} />
                    
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Search</button>
                </span>
            </form>
        );
    }
}
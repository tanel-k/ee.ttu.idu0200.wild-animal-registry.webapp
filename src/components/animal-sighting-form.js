import React, { Component } from 'react';

export default class AnimalSightingForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: null,
            location: {
                humanReadableName: null,
                latitude: null,
                longitude: null
            }
        }

        this.handleAdd = this.handleAdd.bind(this);
    }

    render() {
        return (
            <div className="row mt-1">
                <div className="col-sm-12">
                    <h3>Add sighting</h3>
                    <form onSubmit={this.handleAdd}>
                        <div className='form-group'>
                            <label>Date</label>
                            <input onChange={e => this.handleDateChange(e)} type="date" value={this.state.date} className='form-control'/>
                        </div>

                        <div className='form-group'>
                            <label>Location name</label>
                            <input onChange={e => this.handleLocationNameChange(e)}  value={this.state.location.humanReadableName} className='form-control'/>
                        </div>

                        <div className='form-group'>
                            <label>Latitude</label>
                            <input onChange={e => this.handleLatitudeChange(e)}  value={this.state.location.latitude} className='form-control' />
                        </div>

                        <div className='form-group'>
                            <label>Longitude</label>
                            <input onChange={e => this.handleLongitudeChange(e)} value={this.state.location.longitude} className='form-control' />
                        </div>

                        <button type="submit" className="btn btn-success">Add</button>
                    </form>
                </div>
            </div>
        );
    }


    handleAdd(event) {
        event.preventDefault();
        this.props.handleNewSighting(this.state);
    }

    handleDateChange(event) {
        this.setState({
            date: event.target.value
        });
    }

    handleLocationNameChange(event) {
        this.setState({
            location: {
                ...this.state.location,
                humanReadableName: event.target.value
            }
        });
    }

    handleLatitudeChange(event) {
        this.setState({
            location: {
                ...this.state.location,
                latitude: event.target.value
            }
        });
    }

    handleLongitudeChange(event) {
        this.setState({
            location: {
                ...this.state.location,
                longitude: event.target.value
            }
        });
    }
}
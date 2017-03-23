import React, { Component } from 'react';

class AnimalSightingsTable extends Component {
    renderSighting(sighting) {
        const {
            id,
            date, 
            location: { lat, lon, humanReadableName } 
        } = sighting;

        return (
            <tr key={id}>
                <td>{JSON.stringify(date)}</td>
                <td>{humanReadableName} @ {lat}, {lon}</td>
                <td><button>Delete</button><button>Save</button></td>
            </tr>
        );
    }
    
    render() {
        return (
            <div>
                <h3>Sightings</h3>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.sightings.map(this.renderSighting)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AnimalSightingsTable;
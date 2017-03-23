import React, { Component } from 'react';
import { connect } from 'react-redux';


import AnimalSearchBar from './animal-search-bar';

class AnimalSearch extends Component {
    constructor(props) {
        super(props);

        this.renderAnimal = this.renderAnimal.bind(this);
        this.renderSighting = this.renderSighting.bind(this); 
    }
    handleAnimalSearch(arg) {
        console.log(arg);
    }

    renderSighting(sighting) {
        if (!sighting) {
            return (<span>Not sighted yet</span>); 
        }

        const { date, location } = sighting;

        return (
            <div>{location.humanReadableName}, {JSON.stringify(date)}</div>
        );
    }

    renderAnimal(animal) {
        const { name, species, sightings=[] } = animal;
        console.log(sightings);
        const lastSighting = sightings.reduce((prev, curr) => {
            if (curr.date > prev.date) {
                return curr;
            }

            return prev;
        }, sightings[0]);

        return (
            <tr key={name}>
                <td>{name}</td>
                <td>{species}</td>
                <td>{this.renderSighting(lastSighting)}</td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <AnimalSearchBar handleSearch={this.handleAnimalSearch} />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Species</th>
                            <th>Last sighting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.animals.map(this.renderAnimal)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
      animals: state.animals.all
  };
}

export default connect(mapStateToProps, null)(AnimalSearch);


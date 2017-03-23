import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


import AnimalSearchBar from './animal-search-bar';

class AnimalIndex extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.renderAnimal = this.renderAnimal.bind(this);
        this.renderSighting = this.renderSighting.bind(this); 
    }

    handleAnimalSelect(animal) {
        this.context.router.push(`/animals/${animal.name}`);
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
        const lastSighting = getLastSighting(sightings);

        return (
            <tr className="animal-row" key={name} onClick={() => this.handleAnimalSelect(animal)}>
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

function getLastSighting(sightings) {
    return sightings.reduce((prev, curr) => {
            if (curr.date > prev.date) {
                return curr;
            }

            return prev;
        }, sightings[0]);
}

export default connect(mapStateToProps, null)(AnimalIndex);
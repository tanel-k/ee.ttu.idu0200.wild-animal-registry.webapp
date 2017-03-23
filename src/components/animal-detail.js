import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAnimal, addSighting, updateAnimal } from '../actions/index';
import AnimalDetailForm from './animal-detail-form';
import AnimalSightingForm from './animal-sighting-form';
import AnimalSightingsTable from './animal-sightings-table';

class AnimalDetail extends Component {
    constructor(props) {
        super(props);

        this.handleNewSighting = this.handleNewSighting.bind(this);
        this.handleAnimalChange = this.handleAnimalChange.bind(this);
    }

    componentWillMount() {
        const { params: { name }, fetchAnimal } = this.props;

        fetchAnimal(name);
    }

    render() {
        const { animal } = this.props;

        if(!animal) {
            return (<div>Loading...</div>);
        }
        
        return (
            <div>
                <AnimalDetailForm animal={animal} handleAnimalChange={this.handleAnimalChange} />
                <AnimalSightingForm handleNewSighting={this.handleNewSighting} />
                <AnimalSightingsTable sightings={animal.sightings} />
            </div>
        );
    }

    handleNewSighting(sighting) {
        const { animal: { name } } = this.props;

        this.props.addSighting(name, sighting);
    }

    handleAnimalChange(animalProps) {
        this.props.updateAnimal(animalProps);
    }
}

function mapStateToProps(state) {
    return {
        animal: state.animals.currentAnimal
    }
}

export default connect(mapStateToProps, { fetchAnimal, addSighting, updateAnimal })(AnimalDetail);
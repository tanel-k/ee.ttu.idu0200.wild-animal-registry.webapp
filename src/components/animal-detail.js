import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {
    fetchAnimal,
    updateAnimal,
    addSighting,
    deleteAnimal
} from '../actions/index';
import AnimalEditor from './animal-editor';
import SightingInlineEditor from './sighting-inline-editor';

class AnimalDetail extends Component {
    constructor(props) {
        super(props);

        this.handleAnimalChange = this.handleAnimalChange.bind(this);
    }

    componentWillMount() {
        const { params: { slug }, fetchAnimal } = this.props;

        fetchAnimal(slug);
    }

    handleAnimalChange(animalProps) {
        const { slug } = animalProps;

        this.props.updateAnimal(slug, animalProps);
    }

    render() {
        const { animal } = this.props;

        if(!animal) {
            return (<div>Loading...</div>);
        }
        
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Viewing animal: <em>{animal.name}</em></h3>
                        <AnimalEditor 
                            animal={animal} 
                            handleAnimalChange={this.handleAnimalChange} 
                        />
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-sm-12">
                        <h3>Sightings</h3>
                        <Link to={`/animals/${animal.slug}/sightings/new`} className="btn btn-block btn-primary mb-2">Add sighting</Link>
                        {animal.sightings.map((sighting => (<SightingInlineEditor key={sighting.id} sighting={sighting}/>)))}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        animal: state.animals.currentAnimal
    }
}

export default connect(mapStateToProps, { fetchAnimal, addSighting, deleteAnimal, updateAnimal })(AnimalDetail);
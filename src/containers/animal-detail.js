import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {
    fetchAnimal,
    fetchAnimalSightings,
    updateAnimal,
    addSighting,
    deleteAnimal
} from '../actions/index';
import AnimalEditor from './animal-editor';
import SightingInlineEditor from './sighting-inline-editor';

class AnimalDetail extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        const { id } = this.props.params;
        this.props.fetchAnimal(id)
            .then((response) => {
                if (response.error) {
                    this.context.router.push('/notfound');
                }
            });
        this.props.fetchAnimalSightings(id);
    }

    render() {
        const {
            animal,
            sightings
        } = this.props;

        if(!animal) {
            return (<div>Loading...</div>);
        }
        
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Viewing animal: <em>{animal.name}</em></h3>
                        <AnimalEditor animal={animal} />
                    </div>
                </div>
                <div className="row mt-1">
                    <div className="col-sm-12">
                        <h3>Sightings</h3>
                        <Link 
                            to={`/animals/${animal.id}/sightings/new`}
                            className='btn btn-block btn-success mb-2'
                        >Add sighting</Link>
                        {sightings.map((sighting => (<SightingInlineEditor key={sighting.id} sighting={sighting}/>)))}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
        animal: state.animals.currentAnimal,
        sightings: state.animals.currentAnimalSightings,
});

export default connect(mapStateToProps, {
    fetchAnimal,
    fetchAnimalSightings,
    addSighting,
    deleteAnimal,
    updateAnimal
})(AnimalDetail);
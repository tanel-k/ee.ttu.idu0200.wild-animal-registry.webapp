import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import AnimalMiniDisplay from './animal-mini-display';
import AnimalSearchBar from './animal-search-bar';

class AnimalIndex extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.renderAnimal = this.renderAnimal.bind(this);
    }

    handleAnimalSelect(animal) {
        this.context.router.push(`/animals/${animal.name}`);
    }

    handleAnimalSearch(arg) {
        console.log(arg);
    }

    renderAnimal(animal) {
        return (
            <AnimalMiniDisplay key={animal.name} animal={animal} />
        );
    }

    render() {
        return (
            <div>
                <h3>Animal Index</h3>
                <div className='row'>
                    <div className='col-md-12'>
                        <AnimalSearchBar handleSearch={this.handleAnimalSearch} />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-12'>
                        <Link to='/animals/new' className="btn btn-block btn-success">Register animal</Link>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-12'>
                        {this.props.animals.map(this.renderAnimal)}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)  => ({
      animals: state.animals.all
});

export default connect(mapStateToProps, null)(AnimalIndex);
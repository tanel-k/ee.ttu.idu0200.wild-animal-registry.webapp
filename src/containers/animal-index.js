import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { searchAnimals } from '../actions/index';

import AnimalMiniDisplay from '../components/animal-mini-display';
import AnimalSearchBar from '../components/animal-search-bar';

class AnimalIndex extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            isSearching: false,
        };
        this.renderAnimal = this.renderAnimal.bind(this);
        this.handleAnimalSearch = this.handleAnimalSearch.bind(this);
    }

    handleAnimalSelect(animal) {
        this.context.router.push(`/animals/${animal.id}`);
    }

    handleAnimalSearch(speciesOrName) {
        this.setState({ isSearching: true });
        this.props.searchAnimals(speciesOrName)
            .then(() => { this.setState({ isSearching: false })});
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
                        <AnimalSearchBar 
                            handleSearch={this.handleAnimalSearch}
                            disabled={this.state.isSearching}
                        />
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
      animals: state.animals.found,
});

export default connect(mapStateToProps, {
    searchAnimals,
})(AnimalIndex);
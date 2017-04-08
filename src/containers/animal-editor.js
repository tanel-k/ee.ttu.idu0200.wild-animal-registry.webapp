import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { trim } from '../lib/utils/string-utils';
import {
    deleteAnimal,
    updateAnimal,
} from '../actions/index';
import SpeciesSelector from '../components/controls/species-selector';

class AnimalEditor extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.animal.id,
            name: this.props.animal.name,
            speciesId: this.props.animal.species_id,
            species: this.props.animal.species,
            isDeleting: false,
            isSaving: false,
            speciesErrors: [],
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSpeciesSelect = this.handleSpeciesSelect.bind(this);
    }

    handleSave(event) {
        event.preventDefault();
        this.setState({ isSaving : true });
        const { id, name, speciesId } = this.state;
        this.props.updateAnimal(id, {
            species_id: speciesId,
            name: this.props.animal.name
        }).then((result) => {
            this.setState({ isSaving: false });
            if (result.error) {
                const speciesErrors = result.payload.response.data.species_id || [];
                this.setState({ speciesErrors });
            }
        });
    }

    handleDelete(event) {
        event.preventDefault();
        this.setState({ isDeleting : true });
        this.props.deleteAnimal(this.state.id)
            .then(() => this.context.router.push('/'));
    }

    handleSpeciesSelect(selection) {
        const { label, value } = selection || {};
        this.setState({ speciesId: value, species: label, });
        this.validateSpeciesValue(value);
    }

    handleFormSubmit(event) {
        event.preventDefault();
    }

    validateSpeciesValue(speciesId) {
        let speciesErrors;

        if (!speciesId) {
            speciesErrors = ['This field may not be blank.'];
        } else {
            speciesErrors = [];
        }

        this.setState({ speciesErrors });
    }

    render() {
        if (!this.props.animal) {
            return (<div>Loading...</div>);
        }

        const propsSpecies = {
            value: this.props.animal.species_id,
            label: this.props.animal.species
        };

        return (
            <form onSubmit={this.handleFormSubmit}>
                <div className='form-group'>
                    <label>Name</label>
                    <span className='form-value'>{this.props.animal.name}</span>
                </div>

                <div className={`form-group ${this.state.speciesErrors.length > 0 ? 'has-error' : ''}`}>
                    <label>Species</label>
                    <SpeciesSelector
                        handleSelect={this.handleSpeciesSelect}
                        initialValue={propsSpecies}
                    />
                    {this.state.speciesErrors.map(error => (<span className='help-block' key={error}>{error}</span>))}
                </div>

                <button
                    className='btn btn-primary btn-block'
                    onClick={this.handleSave}
                    disabled={this.state.isSaving || this.state.isDeleting}
                >Save</button>
                <button
                    className='btn btn-danger btn-block'
                    onClick={this.handleDelete}
                    disabled={this.state.isSaving || this.state.isDeleting}
                >Delete</button>
                <Link
                    to='/'
                    disabled={this.state.isSaving || this.state.isDeleting}
                    className='btn btn-default btn-block'>Cancel</Link>
            </form>
        );
    }
}

AnimalEditor.propTypes = {
    handleAnimalChange: PropTypes.func,
};

AnimalEditor.defaultProps = {
    handleAnimalChange: () => {},
};

const mapStateToProps = (state) => ({
    animal: state.animals.currentAnimal,
});

export default connect(mapStateToProps, {
    deleteAnimal, updateAnimal
})(AnimalEditor);
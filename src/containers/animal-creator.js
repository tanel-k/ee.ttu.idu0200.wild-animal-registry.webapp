import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import {
    createAnimal,
} from '../actions/index';
import SpeciesSelector from '../components/controls/species-selector';

class AnimalCreator extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            speciesId: '',
            nameErrors: [],
            speciesErrors: [],
            isCreating: false,
        };

        this.handleSpeciesSelect = this.handleSpeciesSelect.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateSpecies = this.validateSpecies.bind(this);
    }

    handleCreate(event) {
        event.preventDefault();
        this.setState({ isCreating: true });
        this.props.createAnimal({
                name: this.state.name,
                species_id: this.state.speciesId,
            })
            .then(action => action.payload)
            .then((payload) => {
                const {
                    status,
                    data,
                    response
                } = payload;
                
                if (status === 201) {
                    this.context.router.push(`/animals/${data.id}`);
                }
                
                if (response && response.status === 400) {
                    let nameErrors = response.data.name || [];
                    let speciesErrors = response.data.species_id || [];
                    nameErrors = nameErrors.map(msg => msg.replace('null', 'blank'));
                    speciesErrors = speciesErrors.map(msg => msg.replace('null', 'blank'));

                    this.setState({
                        nameErrors,
                        speciesErrors,
                        isCreating: false,
                    });
                }
            });
    }

    handleSpeciesSelect(selection) {
        const speciesId = selection ? selection.value : '';
        this.setState({ speciesId });
        this.validateSpeciesValue(speciesId);
    }

    validateNameValue(name) {
        let nameErrors;
        
        if (!name || !name.trim()) {
            nameErrors = ['This field may not be blank.'];
        } else {
            nameErrors = [];
        }

        this.setState({ nameErrors });
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

    handleNameChange(event) {
        const name = event.target.value;
        this.setState({ name });
        this.validateNameValue(name);
    }

    validateName() {
        const { name } = this.state;
        this.validateNameValue(name);
    }

    validateSpecies() {
        const { speciesId } = this.state;
        this.validateSpeciesValue(speciesId);
    }

    render() {
        const {
            nameErrors,
            speciesErrors,
        } = this.state;
        return (
            <form onSubmit={this.handleCreate.bind(this)}>
                <h3>Register an animal</h3>
                
                <div className={`form-group ${nameErrors.length > 0 ? 'has-error' : ''}`}>
                    <label>Name</label>
                    <input 
                        onChange={this.handleNameChange}
                        className='form-control' 
                        value={this.state.name}
                        onBlur={this.validateName}
                    />
                    {this.state.nameErrors.map(error => (<span className='help-block' key={error}>{error}</span>))}
                </div>

                <div className={`form-group ${speciesErrors.length > 0 ? 'has-error' : ''}`}>
                    <label>Species</label>
                    <SpeciesSelector
                        handleSelect={this.handleSpeciesSelect}
                        onBlur={this.validateSpecies}
                    />
                    {this.state.speciesErrors.map(error => (<span className='help-block' key={error}>{error}</span>))}
                </div>

                <button 
                    type='submit'
                    disabled={this.state.isCreating}
                    className='btn btn-block btn-primary'
                >Create</button>
                <Link 
                    to='/'
                    disabled={this.state.isCreating}
                    className='btn btn-block btn-default'
                >Cancel</Link>
            </form>
        );
    }
}

export default connect(null, {
    createAnimal
})(AnimalCreator);
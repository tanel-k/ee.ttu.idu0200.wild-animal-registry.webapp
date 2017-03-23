import React, { Component } from 'react';
import { Link } from 'react-router';

class AnimalDetailForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: null,
            species: null
        }
    }

    componentWillMount() {
        const { name, species } = this.props.animal;

        this.setState({ name, species });
    }

    render() {
        const { name, species } = this.state;

        return (
            <form onSubmit={this.handleSave.bind(this)}>
                <h3>Animal</h3>
                <div className='form-group'>
                    <label>Name</label>
                    <span className='form-value'>{name}</span>
                </div>

                <div className='form-group'>
                    <label>Species</label>
                    <input onChange={e => this.handleSpeciesChange(e)} className='form-control' value={species} />
                </div>

                <button type="submit" className="btn btn-primary">Save</button>
                <Link to="/" className="btn btn-warning">Back</Link>
            </form>
        );
    }

    handleSpeciesChange(event) {
        this.setState({ species: event.target.value });
    }

    handleSave(event) {
        event.preventDefault();
        this.props.handleAnimalChange(this.state);
    }
}

export default AnimalDetailForm;
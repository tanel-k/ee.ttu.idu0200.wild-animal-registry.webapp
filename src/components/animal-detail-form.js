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

    componentDidMount() {
        const { name, species } = this.props.animal;
        this.setState({ name, species });
    }

    render() {
        return (
            <form onSubmit={this.handleSave.bind(this)}>
                <h3>Animal</h3>
                <div className='form-group'>
                    <label>Name</label>
                    <span className='form-value'>{this.state.name}</span>
                </div>

                <div className='form-group'>
                    <label>Species</label>
                    <input onChange={e => this.handleSpeciesChange(e)} className='form-control' value={this.state.species} />
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
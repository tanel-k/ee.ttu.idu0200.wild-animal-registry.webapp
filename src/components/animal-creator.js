import React, { Component } from 'react';
import { Link } from 'react-router';

class AnimalCreator extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            species: '',
        };

    }

    handleCreate(event) {
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleCreate.bind(this)}>
                <h3>Register an animal</h3>
                
                <div className='form-group'>
                    <label>Name</label>
                    <input className='form-control' value={this.state.name} />
                </div>

                <div className='form-group'>
                    <label>Species</label>
                    <input className='form-control' value={this.state.name} />
                </div>

                <button type='submit' className='btn btn-block btn-primary'>Create</button>
                <Link to='/' className='btn btn-block btn-default'>Cancel</Link>
            </form>
        );
    }
}

export default AnimalCreator;
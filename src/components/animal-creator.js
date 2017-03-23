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

    render() {
        return (
            <form>
                <h3>Register an animal</h3>
                
                <div className='form-group'>
                    <label>Name</label>
                    <input className='form-control' value={this.state.name} />
                </div>

                <div className='form-group'>
                    <label>Species</label>
                    <input className='form-control' value={this.state.name} />
                </div>

                <button type="submit" className="btn btn-primary">Create</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

export default AnimalCreator;
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class AnimalEditor extends Component {
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

    handleSpeciesChange(event) {
        this.setState({ species: event.target.value });
    }

    handleSave(event) {
        event.preventDefault();
        this.props.handleAnimalChange(this.state);
    }

    render() {
        const { name, species } = this.props.animal;

        return (
            <form onSubmit={this.handleSave.bind(this)}>
                <div className='form-group'>
                    <label>Name</label>
                    <span className='form-value'>{this.state.name}</span>
                </div>

                <div className='form-group'>
                    <label>Species</label>
                    <input onChange={e => this.handleSpeciesChange(e)} className='form-control' value={this.state.species} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Save</button>
                <button className="btn btn-danger btn-block">Delete</button>
                <Link to="/" className="btn btn-default btn-block">Cancel</Link>
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

export default AnimalEditor;
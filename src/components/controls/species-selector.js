import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

import axios from 'axios';
import { debounce } from 'lodash/function';

const ROOT_URL = 'https://wild-animal-registry.herokuapp.com/api'

class SpeciesSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.initialValue,
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selection) {
        const value = selection ? selection.value : null;
        this.setState({ value });
        this.props.handleSelect(selection);
    }

    render() {
        return (
            <Select.Async
                loadOptions={debouncedSearch}
                onChange={this.handleSelect}
                autoload={false}
                value={this.state.value}
                placeholder=''
            />
        );
    }
}

const debouncedSearch = debounce((input, cb) => {
    searchSpecies(input).then((result) => cb(null, result));
}, 500);

const searchSpecies = (input) => {
    return axios.get(`${ROOT_URL}/species?vernacular_name=${input}`)
        .then((response) => (response.data))
        .then((array) => (array.map(species => ({
            value: species.id, label: species.vernacular_name
        }))))
        .then((array) => ({options: array}));
}

SpeciesSelector.propTypes = {
    handleSelect: PropTypes.func,
    initialValue: PropTypes.object,
};

SpeciesSelector.defaultProps = {
    handleSelect: () => {},
    initialValue: null,
};

export default SpeciesSelector;
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Categorie extends Component {
  render() {
    const { id, name } = this.props;
    return (
      <label
        htmlFor={ id }
        data-testid="category"
      >
        <input
          id={ id }
          name="categorie"
          value={ name }
          type="radio"
        />
        {name}
      </label>
    );
  }
}
Categorie.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Categorie;

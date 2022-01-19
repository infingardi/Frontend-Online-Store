import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Category extends Component {
  render() {
    const { id, name, handleChange } = this.props;
    return (
      <label
        htmlFor={ id }
        data-testid="category"
      >
        <input
          id={ id }
          name="selectedCategory"
          value={ id }
          onClick={ handleChange }
          type="radio"
        />
        {name}
      </label>
    );
  }
}
Category.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Category;

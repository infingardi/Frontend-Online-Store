import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Category extends Component {
  handleClick = ({ target }) => {
    const label = document.querySelector('.c-label-cyan');
    console.log(label);
    if (label) {
      label.classList.remove('c-label-cyan');
      console.log(label);
    }
    target.parentNode.classList.add('c-label-cyan');
  };

  render() {
    const { id, name, handleChange } = this.props;
    return (
      <label
        id="c-label"
        className="c-label"
        htmlFor={ id }
        data-testid="category"
      >
        <input
          id={ id }
          name="selectedCategory"
          value={ id }
          onClick={ this.handleClick }
          onChange={ handleChange }
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

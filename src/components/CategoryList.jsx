import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getCategories } from '../services/api';
import Category from './Category';

class CategoryList extends Component {
  constructor() {
    super();
    this.state = { categories: [] };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const request = await getCategories();
    this.setState({ categories: [...request] });
  }

  render() {
    const { categories } = this.state;
    const { handleChange } = this.props;
    return (
      <form className="categorie-form">
        {categories.map(({ name, id }) => (<Category
          key={ id }
          id={ id }
          name={ name }
          handleChange={ handleChange }
        />))}
      </form>
    );
  }
}

CategoryList.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default CategoryList;

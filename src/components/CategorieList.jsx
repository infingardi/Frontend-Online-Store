import React, { Component } from 'react';
import { getCategories } from '../services/api';
import Categorie from './Categorie';

class CategorieList extends Component {
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
    return (
      <form className="categorie-form">
        {categories.map(({ name, id }) => (<Categorie
          key={ id }
          id={ id }
          name={ name }
        />))}
      </form>
    );
  }
}

export default CategorieList;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import navbar from '../assets/navbar.png';
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

  showMenu = ({ target }) => {
    const form = document.querySelector('.categorie-form');
    if (target.checked) { form.style.left = '0'; } else {
      (
        form.style.left = '-350px'
      );
    }
  }

  clickMenu = () => {
    const labelChekc = document.querySelector('#label-navbar');
    if (labelChekc.className === 'clicked') {
      labelChekc.className = 'label-navbar';
    } else { labelChekc.className = 'clicked'; }
  }

  fetchCategories = async () => {
    const request = await getCategories();
    this.setState({ categories: [...request] });
  }

  render() {
    const { categories } = this.state;
    const { handleChange } = this.props;
    return (
      <>
        <label
          id="label-navbar"
          className="label-navbar"
          htmlFor="show-categories"
          onChange={ this.clickMenu }
        >
          <h2>Categorias</h2>
          <img
            className="navbar-logo"
            src={ navbar }
            alt="show-categories"
          />

          <input
            id="show-categories"
            className="show-categories"
            type="checkbox"
            onChange={ this.showMenu }
          />
        </label>
        <form className="categorie-form">

          {categories.map(({ name, id }) => (<Category
            key={ id }
            id={ id }
            name={ name }
            categories={ categories }
            handleChange={ handleChange }
          />))}
        </form>
      </>
    );
  }
}

CategoryList.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default CategoryList;

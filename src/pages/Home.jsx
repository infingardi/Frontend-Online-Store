import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CategoryList from '../components/CategoryList';
import CardList from '../components/CardList';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      products: [],
      selectedCategory: 'Construção',
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    const { searchInput, selectedCategory } = this.state;
    const request = await getProductsFromCategoryAndQuery(selectedCategory, searchInput);
    this.setState({ products: [...request.results] });
  };

  handleChangeCategory = ({ target }) => {
    this.setState({ selectedCategory: target.value });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { searchInput, products } = this.state;
    return (
      <div>
        <h3
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
        <label htmlFor="searchInput">
          <input
            type="text"
            name="searchInput"
            id="searchInput"
            value={ searchInput }
            data-testid="query-input"
            onChange={ this.handleChange }
          />

          <button
            type="button"
            onClick={ this.fetchProducts }
            data-testid="query-button"
          >
            Pesquisar
          </button>
        </label>
        <Link data-testid="shopping-cart-button" to="/cart"> Carrinho </Link>
        <div>
          <CategoryList handleChange={ this.handleChange } />
          <CardList
            searchInput={ searchInput }
            products={ products }
          />
        </div>
      </div>
    );
  }
}

export default Home;

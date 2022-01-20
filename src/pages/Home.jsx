import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CategoryList from '../components/CategoryList';
import CardList from '../components/CardList';
import cartLogo from '../assets/cartLogo.png';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      products: [],
      selectedCategory: 'MLB1648',
      cartItems: [],
    };

    this.addCartItem = this.addCartItem.bind(this);
  }

  componentDidMount() {
    this.initLocalStorage();
    this.fetchProducts();
  }

  initLocalStorage = () => {
    const itemStorage = JSON.parse(localStorage.getItem('cartItems'));
    if (!itemStorage || (itemStorage.length === 0)) {
      this.addItemStorage();
    } else {
      this.setState({ cartItems: itemStorage });
      localStorage.setItem('cartItems', [JSON.stringify(itemStorage)]);
    }
  }

  addItemStorage = () => {
    const { cartItems } = this.state;

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  addCartItem = (id, title, price, image) => {
    const product = { id, title, price, image, quantidade: 1 };
    const { cartItems: items } = this.state;

    const verify = items.find((item) => item.id === product.id);

    if (verify) {
      verify.quantidade += 1;
      this.setState(({ cartItems }) => ({
        cartItems: [...cartItems],
      }), this.addItemStorage);
    } else {
      this.setState(({ cartItems }) => ({
        cartItems: [...cartItems, product],
      }), this.addItemStorage);
    }
  }

  fetchProducts = async () => {
    const { searchInput, selectedCategory } = this.state;
    const request = await getProductsFromCategoryAndQuery(selectedCategory, searchInput);
    this.setState({ products: [...request.results] });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { searchInput, products } = this.state;
    return (
      <div className="home-content">
        <h3
          className="initial-message"
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h3>
        <label className="searchInputLabel" htmlFor="searchInput">
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
        <Link
          className="cart-icon"
          data-testid="shopping-cart-button"
          to="/cart"
        >
          <img className="cart-logo" src={ cartLogo } alt="cartLogo" />
        </Link>
        <section className="categorie-products">
          <div className="divform">
            <CategoryList handleChange={ this.handleChange } />
          </div>
          <div>
            <CardList
              searchInput={ searchInput }
              products={ products }
              addCartItem={ this.addCartItem }
            />
          </div>
        </section>
      </div>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <label htmlFor="searchImput">
          <input type="text" name="searchImput" id="searchImput" />
          <h3
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        </label>
        <Link data-testid="shopping-cart-button" to="/cart"> Carrinho </Link>
      </div>
    );
  }
}

export default Home;

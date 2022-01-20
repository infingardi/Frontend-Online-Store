import React, { Component } from 'react';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.getItemStorage();
  }

  getItemStorage = () => {
    const cartItems = localStorage.getItem('cartItems');
    this.setState({ items: [...JSON.parse(cartItems)] });
  }

  render() {
    const { items } = this.state;

    return (
      <div>
        { items.length === 0 && (
          <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>)}
        {items
          .map(({ id, title, price, image, quantidade }) => (
            <div key={ id }>
              <h3 data-testid="shopping-cart-product-name">{title}</h3>
              <img src={ image } alt="Produto" />
              <h3>{ price }</h3>
              <p data-testid="shopping-cart-product-quantity">
                { quantidade }
              </p>
            </div>
          ))}
      </div>
    );
  }
}

export default Cart;

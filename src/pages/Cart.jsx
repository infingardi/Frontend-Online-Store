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

  handleClick(id, operation) {
    const cartItem = JSON.parse(localStorage.getItem('cartItems'));

    const product = cartItem.find((item) => item.id === id);
    if (operation === '-') {
      product.quantidade -= 1;
    } else if (operation === '+') {
      product.quantidade += 1;
    } else { product.quantidade = 0; }
    const newStorage = cartItem.filter((item) => item.quantidade !== 0);

    localStorage.setItem('cartItems', JSON.stringify(newStorage));
    this.getItemStorage();
  }

  getItemStorage = () => {
    const cartItems = localStorage.getItem('cartItems');
    this.setState({ items: [...JSON.parse(cartItems)] });
  }

  render() {
    const { items } = this.state;

    return (
      <div className="cart">
        { items.length === 0 && (
          <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>)}
        {items
          .map(({ id, title, price, image, quantidade }) => (
            <div className="cart-item" key={ id }>
              <h3 data-testid="shopping-cart-product-name">{title}</h3>
              <img src={ image } alt="Produto" />
              <h3>{ price }</h3>
              <button
                data-testid="product-decrease-quantity"
                onClick={ () => this.handleClick(id, '-') }
                type="button"
              >
                -

              </button>
              <p data-testid="shopping-cart-product-quantity">
                { quantidade }
              </p>
              <button
                data-testid="product-increase-quantity"
                onClick={ () => this.handleClick(id, '+') }
                type="button"
              >
                +

              </button>
              <button
                className="btn-remove"
                onClick={ () => this.handleClick(id, '.') }
                type="button"
              >
                Remover item

              </button>
            </div>
          ))}
      </div>
    );
  }
}

export default Cart;

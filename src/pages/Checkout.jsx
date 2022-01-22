import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CheckoutItem from '../components/CheckoutItem';
import BuyerInfo from '../components/BuyerInfo';
import PaymentMethod from '../components/PaymentMethod';

class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      totalPrice: 0,
    };
  }

  componentDidMount() {
    this.getItemStorage();
  }

  getItemStorage = () => {
    const cartItems = localStorage.getItem('cartItems');
    this.setState({ items: [...JSON.parse(cartItems)] }, this.getTotalPrice);
  }

  getTotalPrice = () => {
    const { items } = this.state;
    let tPrice = items.reduce((prevValue, { price, quantidade }) => (
      prevValue + (price * quantidade)
    ), 0);

    tPrice = tPrice.toFixed(2);
    this.setState({ totalPrice: tPrice });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    const labels = document.querySelectorAll('.card-label');
    target.parentNode.style.backgroundColor = 'darkcyan';
    labels.forEach((label) => {
      if (label.htmlFor !== target.parentNode.htmlFor) {
        label.style.backgroundColor = 'white';
      }
    });
  };

  completePurchase = (event) => {
    event.preventDefault();
    const { history } = this.props;
    this.setState({
      items: [],
      totalPrice: 0,
    });

    history.push('/');

    localStorage.removeItem('cartItems');
    localStorage.setItem('cartItems', JSON.stringify([]));
  }

  render() {
    const {
      items,
      totalPrice,
    } = this.state;

    return (
      <div className="checkout-page">
        <div className="checkout-items">
          { items.length === 0 && (
            <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>)}
          {items
            .map(({ id, title, price, image, quantidade }) => (
              <CheckoutItem
                key={ id }
                title={ title }
                price={ price }
                image={ image }
                quantidade={ quantidade }
              />
            ))}
        </div>
        <div className="pagamento">
          <form>
            <BuyerInfo />
            <PaymentMethod />
            <button onClick={ this.completePurchase } type="submit">Comprar</button>
            <p style={ { margin: '30px' } }>
              {' '}
              <strong>Total:</strong>
              {' '}
              R$:
              { totalPrice }
            </p>
          </form>
        </div>
        <div />
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;

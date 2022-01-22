import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckoutItem extends Component {
  render() {
    const { title, image, price, quantidade } = this.props;
    return (
      <div className="checkout-item">
        <h3 data-testid="shopping-cart-product-name">{title}</h3>
        <img src={ image } alt="Produto" />
        <h3>
          R$
          { price.toFixed(2) }
        </h3>
        <p className="quantidade" data-testid="shopping-cart-product-quantity">
          { quantidade }
        </p>
      </div>
    );
  }
}

CheckoutItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantidade: PropTypes.number.isRequired,
};

export default CheckoutItem;

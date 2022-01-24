import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const { title, price, image, id, addCartItem, stock } = this.props;
    return (
      <div className="product" data-testid="product">
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>
          <h3 data-testid="shopping-cart-product-name">{ title }</h3>

          <img src={ image } alt="Produto" />
        </Link>
        <h3>
          R$:
          {' '}
          { price.toFixed(2) }
        </h3>
        <button
          className="card-button"
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => { addCartItem({ id, title, price, image, stock }); } }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
}.isRequired;

export default Card;

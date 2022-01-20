import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const { title, price, image, id } = this.props;
    return (
      <div className="product" data-testid="product">
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>
          <h3>{ title }</h3>
        </Link>
        <img src={ image } alt="Produto" />
        <h3>{ price }</h3>

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

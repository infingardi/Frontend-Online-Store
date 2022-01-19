import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { title, price, image } = this.props;
    return (
      <div data-testid="product">
        <h3>{ title }</h3>
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

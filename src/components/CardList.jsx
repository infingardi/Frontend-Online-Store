import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class CardList extends Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        {products.map(({ id, title, price, thumbnail }) => (
          <Card
            key={ id }
            id={ id }
            title={ title }
            price={ price }
            image={ thumbnail }
          />
        ))}
      </div>
    );
  }
}

CardList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
}.isRequired;

export default CardList;

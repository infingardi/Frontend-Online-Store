import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class CardList extends Component {
  render() {
    const { products, addCartItem } = this.props;
    return (
      <div className="div-products">
        {products
          .map(({
            id,
            title,
            price,
            thumbnail,
            available_quantity: stock,
            shipping: { free_shipping: shipping },
          }) => (
            <Card
              key={ id }
              id={ id }
              title={ title }
              price={ price }
              image={ thumbnail }
              addCartItem={ addCartItem }
              stock={ stock }
              shipping={ shipping }
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

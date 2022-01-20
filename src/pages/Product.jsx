import React, { Component } from 'react';
import propTypes from 'prop-types';
import { getProductInfo } from '../services/api';

class Product extends Component {
  constructor() {
    super();
    this.state = { productInfo: {},
      specs: [] };
  }

  componentDidMount() {
    this.fetchProductInfo();
  }

  fetchProductInfo = async () => {
    const { location: { pathname } } = this.props;
    const productID = pathname.split('/');
    const request = await getProductInfo(productID[2]);
    this.setState({ productInfo: request, specs: request.attributes });
  };

  render() {
    const { productInfo: { title, thumbnail, price }, specs } = this.state;
    return (
      <div>
        <h2 data-testid="product-detail-name">{title}</h2>
        <img src={ thumbnail } alt="" />
        <h4>
          Preço:
          {' '}
          $
          {price}
        </h4>
        <button type="button">Comprar</button>
        <div>
          <h4>Especificações Tecnicas</h4>
          {specs.map((spec) => (
            <>
              <h5 key={ spec.id }>{spec.name}</h5>
              {' '}
              <span>{spec.value_name}</span>
            </>))}
        </div>
      </div>);
  }
}

Product.propTypes = {
  match: propTypes.shape({
    params: propTypes.objectOf(propTypes.number),
  }),
}.isRequired;

export default Product;

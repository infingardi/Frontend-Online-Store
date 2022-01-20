import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import { getProductInfo } from '../services/api';
import cartLogo from '../assets/cartLogo.png';
import cardsLogo from '../assets/cardsLogo.png';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      productInfo: {},
      specs: [],
      pictures: [],
    };
  }

  componentDidMount() {
    this.fetchProductInfo();
  }

  addCartItem = () => {
    const { productInfo: { id, title, price, image } } = this.state;
    const product = { id, title, price, image, quantidade: 1 };
    const cartItem = JSON.parse(localStorage.getItem('cartItems'));

    const verify = cartItem.find((item) => item.id === product.id);

    if (verify) {
      verify.quantidade += 1;
    } else {
      cartItem.push(product);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItem));
  }

  fetchProductInfo = async () => {
    const { location: { pathname } } = this.props;
    const productID = pathname.split('/');
    const request = await getProductInfo(productID[2]);

    this.setState({
      productInfo: request,
      specs: request.attributes,
      pictures: request.pictures,
    });
  };

  render() {
    const { productInfo: { title, thumbnail, price }, specs, pictures } = this.state;
    const image = pictures.length === 0 ? thumbnail : pictures[0].url;

    return (
      <div className="div-product-info">
        <h2 data-testid="product-detail-name">{title}</h2>
        <div className="img-price">
          <img src={ image } alt="" />

          <div>
            <Link
              className="cart-icon"
              data-testid="shopping-cart-button"
              to="/cart"
            >
              <img className="cart-logo" src={ cartLogo } alt="cartLogo" />
            </Link>
            <h4>
              Preço:
              {' '}
              $
              {price}
            </h4>
            <span>em até 12x</span>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ this.addCartItem }
            >
              Adicionar ao carrinho

            </button>
            <div className="parcelamento">
              <h4>PARCELAMENTO</h4>
              <p>Visa</p>
              <p>Master</p>
              <p>American Express</p>
            </div>
            <img className="cards-logo" src={ cardsLogo } alt="cards" />
          </div>
        </div>

        <div className="div-specs">
          <h4>Especificações Tecnicas:</h4>
          {specs.map((spec, index) => (
            <div className="spec" key={ index }>
              <h5>
                { spec.name }
                :
              </h5>
              {' '}
              <span>{ spec.value_name }</span>
            </div>))}
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

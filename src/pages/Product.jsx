import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import { getProductInfo } from '../services/api';
import cartLogo from '../assets/cartLogo.png';
import cardsLogo from '../assets/cardsLogo.png';
import Evaluation from '../components/Evaluation';
import FormEval from '../components/FormEval';
import Parcelamento from '../components/Parcelamento';

class Product extends Component {
  constructor() {
    super();
    this.state = {
      productInfo: {},
      specs: [],
      pictures: [],
      objEvaluation: [],
      email: '',
      rating: '',
      detailEvaluation: '',
    };
  }

  componentDidMount() {
    this.initLocalStorage();
    this.fetchProductInfo();
  }

  initLocalStorage = () => {
    const itemStorage = JSON.parse(localStorage.getItem('evaluations'));
    if (!itemStorage || (itemStorage.length === 0)) {
      this.evalStorage();
    } else {
      this.setState({ objEvaluation: itemStorage });
      localStorage.setItem('evaluations', [JSON.stringify(itemStorage)]);
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addCartItem = () => {
    const { productInfo: { id, title, price, thumbnail: image } } = this.state;
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

  submitButton = (event) => {
    event.preventDefault();
    const {
      email,
      rating,
      detailEvaluation,
    } = this.state;
    const { match: { params: { id } } } = this.props;
    const evaluation = { email, rating, detailEvaluation, id };
    this.setState(({ objEvaluation }) => (
      { objEvaluation: [...objEvaluation, evaluation] }
    ), this.evalStorage);
    console.log(evaluation);
  }

  evalStorage = () => {
    const { objEvaluation } = this.state;
    localStorage.setItem('evaluations', JSON.stringify(objEvaluation));
  }

  calcParcelas = (price, parcelas) => price / parcelas

  render() {
    const {
      productInfo: { title, thumbnail, price },
      specs,
      pictures,
      email,
      detailEvaluation,
      objEvaluation,
    } = this.state;
    const { match: { params: { id } } } = this.props;
    const image = pictures.length === 0 ? thumbnail : pictures[0].url;
    const evalFilter = objEvaluation.filter((evalu) => (
      evalu.id === id
    ));
    return (
      <div className="div-product-info">

        <div className="img-price">
          <div className="title"><h2 data-testid="product-detail-name">{title}</h2></div>
          <div
            style={ {
              flexDirection: 'column',
              display: 'flex' } }
          >
            <img src={ image } alt="" />
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ this.addCartItem }
            >
              Adicionar ao carrinho

            </button>
          </div>
          <div>
            <Link
              className="cart-icon-details"
              data-testid="shopping-cart-button"
              to="/cart"
            >
              <img className="cart-logo" src={ cartLogo } alt="cartLogo" />
            </Link>
            <h4>
              Preço:
              {' '}
              R$
              {price}
              0
            </h4>
            <span>
              {' '}
              <strong>em até 12x</strong>
            </span>

            <Parcelamento calcParcelas={ this.calcParcelas } price={ price } />
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

        <FormEval
          id={ id }
          email={ email }
          handleChange={ this.handleChange }
          detailEvaluation={ detailEvaluation }
          submitButton={ this.submitButton }
        />
        {evalFilter.length && (
          <div className="div-specs">
            {evalFilter
              .map((evalu) => (
                <Evaluation
                  key={ evalu.detailEvaluation }
                  id={ evalu.id }
                  email={ evalu.email }
                  rating={ evalu.rating }
                  detailEvaluation={ evalu.detailEvaluation }
                />
              ))}
          </div>
        )}

      </div>);
  }
}
Product.propTypes = {
  match: propTypes.shape({
    params: propTypes.objectOf(propTypes.number),
  }),
}.isRequired;

export default Product;

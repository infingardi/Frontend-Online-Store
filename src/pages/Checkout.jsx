import React, { Component } from 'react';
import PropTypes from 'prop-types';
import states from '../services/states';
import masterLogo from '../assets/mastercard-logo.png';
import visaLogo from '../assets/visa-logo-2.png';
import eloLogo from '../assets/Elo_logo.png';
import boleto from '../assets/boleto.png';

class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      totalPrice: 0,
      fullName: '',
      cpf: '',
      email: '',
      telefone: '',
      cep: '',
      endereco: '',
      complemento: '',
      numero: '',
      cidade: '',
      estado: 'Acre',
      pagamento: '',
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
      fullName: '',
      cpf: '',
      email: '',
      telefone: '',
      cep: '',
      endereco: '',
      complemento: '',
      numero: '',
      cidade: '',
      estado: 'Acre',
      pagamento: '',
    });

    history.push('/');

    localStorage.removeItem('cartItems');
    localStorage.setItem('cartItems', JSON.stringify([]));
  }

  render() {
    const {
      items, totalPrice, fullName, cpf, email, telefone, cep, endereco,
      complemento, numero, cidade, estado, pagamento,
    } = this.state;

    return (
      <div className="checkout-page">
        <div className="checkout-items">
          { items.length === 0 && (
            <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>)}
          {items
            .map(({ id, title, price, image, quantidade }) => (
              <div className="checkout-item" key={ id }>
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
            ))}
        </div>
        <div className="pagamento">
          <form>
            <input
              type="text"
              placeholder="Nome Completo"
              value={ fullName }
              name="fullName"
              onChange={ this.handleChange }
              data-testid="checkout-fullname"
            />
            <input
              type="text"
              placeholder="CPF"
              value={ cpf }
              name="cpf"
              onChange={ this.handleChange }
              data-testid="checkout-cpf"
            />
            <input
              type="email"
              placeholder="Email"
              value={ email }
              name="email"
              onChange={ this.handleChange }
              data-testid="checkout-email"
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={ telefone }
              name="telefone"
              onChange={ this.handleChange }
              data-testid="checkout-phone"
            />
            <input
              type="text"
              placeholder="CEP"
              value={ cep }
              name="cep"
              onChange={ this.handleChange }
              data-testid="checkout-cep"
              required
              pattern="\d{5}-\d{3}"
            />
            <input
              type="text"
              placeholder="Endereço"
              value={ endereco }
              name="endereco"
              onChange={ this.handleChange }
              data-testid="checkout-address"
            />
            <input
              type="text"
              placeholder="Complemento"
              value={ complemento }
              name="complemento"
              onChange={ this.handleChange }
            />
            <input
              type="number"
              placeholder="Número"
              value={ numero }
              name="numero"
              onChange={ this.handleChange }
            />
            <input
              type="text"
              placeholder="Cidade"
              value={ cidade }
              name="cidade"
              onChange={ this.handleChange }
            />
            <select value={ estado } name="estado" onChange={ this.handleChange }>
              { states.map(({ value, key }) => (
                <option key={ key }>
                  { value }
                </option>))}
            </select>

            <h4>Método de Pagamento:</h4>
            <label
              className="card-label"
              htmlFor="boleto"
            >
              <input
                style={ { display: 'none' } }
                type="checkbox"
                name="pagamento"
                id="boleto"
                value="boleto"
                onChange={ this.handleChange }
              />
              <img className="card-logo" src={ boleto } alt="" />
            </label>
            <label className="card-label" htmlFor="visa">
              <input
                style={ { display: 'none' } }
                type="radio"
                name="pagamento"
                id="visa"
                value="visa"
                onChange={ this.handleChange }
              />
              <img className="card-logo" src={ visaLogo } alt="" />
            </label>
            <label className="card-label" htmlFor="mastercard">
              <input
                style={ { display: 'none', backgroundColor: 'darkcyan' } }
                type="radio"
                name="pagamento"
                id="mastercard"
                value="mastercard"
                onChange={ this.handleChange }
              />
              <img className="card-logo" src={ masterLogo } alt="" />
            </label>
            <label className="card-label" htmlFor="elo">
              <input
                style={ { display: 'none' } }
                type="radio"
                name="pagamento"
                id="elo"
                value="elo"
                onChange={ this.handleChange }
              />
              <img className="card-logo" src={ eloLogo } alt="" />
            </label>
            <p style={ { display: 'none' } }>
              {' '}
              { pagamento}
              {' '}
            </p>

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

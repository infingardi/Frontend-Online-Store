import React, { Component } from 'react';
import PropTypes from 'prop-types';

import states from '../services/states';

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
      <div>
        <div className="cart">
          { items.length === 0 && (
            <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>)}
          {items
            .map(({ id, title, price, image, quantidade }) => (
              <div className="cart-item" key={ id }>
                <h3 data-testid="shopping-cart-product-name">{title}</h3>
                <img src={ image } alt="Produto" />
                <h3>{ price }</h3>
                <p data-testid="shopping-cart-product-quantity">
                  { quantidade }
                </p>
              </div>
            ))}
          <p>
            {' '}
            total:
            {' '}
            { totalPrice }
          </p>
        </div>
        <div>
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

            <h4>Método de Pagamento</h4>
            <label htmlFor="boleto">
              Boleto
              <input
                type="radio"
                name="pagamento"
                id="boleto"
                value="boleto"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="visa">
              Visa
              <input
                type="radio"
                name="pagamento"
                id="visa"
                value="visa"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="mastercard">
              mastercard
              <input
                type="radio"
                name="pagamento"
                id="mastercard"
                value="mastercard"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="elo">
              Elo
              <input
                type="radio"
                name="pagamento"
                id="elo"
                value="elo"
                onChange={ this.handleChange }
              />
            </label>
            <p style={ { display: 'none' } }>
              {' '}
              { pagamento}
              {' '}
            </p>

            <button onClick={ this.completePurchase } type="submit">Comprar</button>
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

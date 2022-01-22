import React, { Component } from 'react';

import states from '../services/states';

class BuyerInfo extends Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      cpf: '',
      email: '',
      phone: '',
      cep: '',
      address: '',
      complement: '',
      number: '',
      city: '',
      state: 'Acre',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      fullname,
      cpf,
      email,
      phone,
      cep,
      address,
      complement,
      number,
      city,
      state,
    } = this.state;
    return (
      <>
        <input
          type="text"
          placeholder="Nome Completo"
          value={ fullname }
          name="fullname"
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
          value={ phone }
          name="phone"
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
          value={ address }
          name="address"
          onChange={ this.handleChange }
          data-testid="checkout-address"
        />
        <input
          type="text"
          placeholder="Complemento"
          value={ complement }
          name="complement"
          onChange={ this.handleChange }
        />
        <input
          type="number"
          placeholder="Número"
          value={ number }
          name="number"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          placeholder="Cidade"
          value={ city }
          name="city"
          onChange={ this.handleChange }
        />
        <select value={ state } name="state" onChange={ this.handleChange }>
          { states.map(({ value, key }) => (
            <option key={ key }>
              { value }
            </option>))}
        </select>
      </>
    );
  }
}

export default BuyerInfo;

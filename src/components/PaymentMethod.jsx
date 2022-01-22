import React, { Component } from 'react';

import masterLogo from '../assets/mastercard-logo.png';
import visaLogo from '../assets/visa-logo-2.png';
import eloLogo from '../assets/Elo_logo.png';
import boleto from '../assets/boleto.png';

class PaymentMethod extends Component {
  constructor() {
    super();

    this.state = {
      payment: '',
    };
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

  render() {
    const { payment } = this.state;
    return (
      <>
        <h4>Método de Pagamento:</h4>
        <label
          className="card-label"
          htmlFor="boleto"
        >
          <input
            style={ { display: 'none' } }
            type="checkbox"
            name="payment"
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
            name="payment"
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
            name="payment"
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
            name="payment"
            id="elo"
            value="elo"
            onChange={ this.handleChange }
          />
          <img className="card-logo" src={ eloLogo } alt="" />
        </label>
        <p style={ { display: 'none' } }>
          {' '}
          { payment }
          {' '}
        </p>
      </>
    );
  }
}

export default PaymentMethod;

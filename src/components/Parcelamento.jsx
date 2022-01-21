import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Parcelamento extends Component {
  render() {
    const { calcParcelas, price } = this.props;
    return (
      <div className="parcelamento">
        <h4>PARCELAMENTO</h4>
        <p>
          <strong>
            {calcParcelas(price, 1).toFixed(2)}
            {' '}
            À Vista
          </strong>
        </p>
        <p>ou</p>
        <p>
          2x
          {' '}
          <strong>
            {calcParcelas(price, '2').toFixed(2)}
          </strong>
        </p>
        <p>
          3x
          {' '}
          <strong>
            {calcParcelas(price, '3').toFixed(2)}
          </strong>
        </p>
        <p>
          4x
          {' '}
          <strong>
            {calcParcelas(price, '4').toFixed(2)}
          </strong>
        </p>
        <p>
          5x
          {' '}
          <strong>
            {calcParcelas(price, '5').toFixed(2)}
          </strong>
        </p>
        <p>
          6x
          {' '}
          <strong>
            {calcParcelas(price, '6').toFixed(2)}
          </strong>
        </p>
        <p>
          7x
          {' '}
          <strong>
            {calcParcelas(price, '7').toFixed(2)}
          </strong>
        </p>
        <p>
          8x
          {' '}
          <strong>
            {calcParcelas(price, '8').toFixed(2)}
          </strong>
        </p>
        <p>
          9x
          {' '}
          <strong>
            {calcParcelas(price, '9').toFixed(2)}
          </strong>
        </p>
        <p>
          10x
          {' '}
          <strong>
            {calcParcelas(price, '10').toFixed(2)}

          </strong>
        </p>
        <p>
          11x
          {' '}
          <strong>
            {calcParcelas(price, '11').toFixed(2)}
          </strong>
        </p>
        <p>
          12x
          {' '}
          <strong>
            {calcParcelas(price, '12').toFixed(2)}

          </strong>
        </p>

      </div>);
  }
}

Parcelamento.propTypes = {
  price: PropTypes.number,
  calcParcelas: PropTypes.func,
}.isRequired;
export default Parcelamento;

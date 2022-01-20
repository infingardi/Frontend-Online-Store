import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormEval extends Component {
  render() {
    const { email, handleChange, detailEvaluation, submitButton } = this.props;
    return (
      <div className="div-specs">
        <h4>Avaliações</h4>
        <form action="">
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              data-testid="product-detail-email"
              placeholder="Email"
              value={ email }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="rating">
            1
            <input
              type="radio"
              name="rating"
              id="rating-one"
              data-testid="1-rating"
              value="1"
              onClick={ handleChange }
            />
          </label>
          <label htmlFor="rating">
            2
            <input
              type="radio"
              name="rating"
              id="rating-two"
              data-testid="2-rating"
              value="2"
              onClick={ handleChange }
            />
          </label>
          <label htmlFor="rating">
            3
            <input
              type="radio"
              name="rating"
              id="rating-three"
              data-testid="3-rating"
              value="3"
              onClick={ handleChange }
            />
          </label>
          <label htmlFor="rating">
            4
            <input
              type="radio"
              name="rating"
              id="rating-four"
              data-testid="4-rating"
              value="4"
              onClick={ handleChange }
            />
          </label>
          <label htmlFor="rating">
            5
            <input
              type="radio"
              name="rating"
              id="rating-five"
              data-testid="5-rating"
              value="5"
              onClick={ handleChange }
            />
          </label>
          <label htmlFor="detailEvaluation">
            <textarea
              name="detailEvaluation"
              id="detail-evaluation"
              cols="30"
              rows="10"
              placeholder="Mensagem (opcional)"
              data-testid="product-detail-evaluation"
              value={ detailEvaluation }
              onChange={ handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ submitButton }
          >
            Avaliar
          </button>
        </form>
      </div>
    );
  }
}

FormEval.propTypes = {
  email: PropTypes.string,
  rating: PropTypes.string,
  detailEvaluation: PropTypes.string,
}.isRequired;

export default FormEval;

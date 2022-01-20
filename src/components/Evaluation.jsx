import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Evaluation extends Component {
  render() {
    const { email, rating, detailEvaluation } = this.props;
    return (
      <div className="evaluation">
        <h4>{ email }</h4>
        <span>{ rating }</span>
        <p>{ detailEvaluation }</p>
      </div>
    );
  }
}

Evaluation.propTypes = {
  id: PropTypes.string,
  email: PropTypes.string,
  rating: PropTypes.string,
  detailEvaluation: PropTypes.string,
}.isRequired;

export default Evaluation;

import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <label htmlFor="searchImput">
          <input type="text" name="searchImput" id="searchImput" />
          <h3
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        </label>
      </div>
    );
  }
}

export default Home;

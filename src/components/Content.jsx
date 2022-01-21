import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Product from '../pages/Product';
import Checkout from '../pages/Checkout';

class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/cart" component={ Cart } />
        <Route exact path="/product/:id" component={ Product } />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    );
  }
}

export default Content;

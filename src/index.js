import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Navbar from './components/Navbar';
import BeerBoard from './components/BeerBoard';
import SampledBeers from './components/SampledBeers';

render(
  <Router history = {browserHistory}>
    <Route path = '/' component = {Navbar}>
      <Route path = 'beers' component = {BeerBoard} />
      <Route path = 'view' component = {SampledBeers}/>
    </Route>
  </Router>,
  document.getElementById('root')
)

import React, { Component } from 'react';
import BeerActions from '../actions/BeerActions';
import { Link } from 'react-router';


export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    }
    this.randomBeer = this.randomBeer.bind(this);
  }

  randomBeer() {
    BeerActions.randomBeer();
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-default navbar-fixed-top">
          <form className="navbar-form navbar-left" role="search">
            <Link to='beers' className="btn btn-primary" onClick={this.randomBeer}>Random</Link>
            <Link to='view' className="btn btn-success">View SampledBeers</Link>
          </form>
        </nav>
        <div className="beersContainer">
          {this.props.children}
        </div>
      </div>
    )
  }
};

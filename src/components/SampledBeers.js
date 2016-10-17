import React, { Component } from 'react';
import BeerStore from '../stores/BeerStore';
import BeerActions from  '../actions/BeerActions';

export default class SampledBeers extends Component {
  constructor() {
    super();
    this.state = {
      sampledBeers: BeerStore.getAllSampled()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    BeerStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    BeerStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ sampledBeers: BeerStore.getAllSampled() })
  }


  // addSampled(beerName) {
  //   let sampleBeer = {
  //     beerName,
  //     marked: true
  //   }
  //   BeerActions.addSampled(sampleBeer);
  // }

  render() {
    let { sampledBeers } = this.state;
    console.log('sampledBeers:', sampledBeers);

    return (
      <div className="row">

      </div>
    )
  }
};

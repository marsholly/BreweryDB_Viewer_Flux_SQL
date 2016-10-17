import React, { Component } from 'react';
import BeerStore from '../stores/BeerStore';
import BeerActions from  '../actions/BeerActions';

export default class BeerBoard extends Component {
  constructor() {
    super();
    this.state = {
      beers: BeerStore.getAllBeers()
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
    this.setState({ beers: BeerStore.getAllBeers() })
  }

  addSampled(beerName) {
    let sampleBeer = {
      beerName,
      marked: true
    }
    BeerActions.addSampled(sampleBeer);
  }

  render() {
    let { beers } = this.state;
    let beerName='', beerDescription='', pic_url='';
    if ( beers ) {
      let {id, labels, style } = beers.data;
      let {name, medium} = style;
      if (medium) {
        pic_url = medium;
      } else {
        pic_url = 'https://s-media-cache-ak0.pinimg.com/originals/e6/ed/23/e6ed237d9d9a3a3b4ae3663f3f6fb32d.jpg'
      }
      beerName = name;
      beerDescription = style.description;
    }
    return (
      <div className="row">
        <div className="randomBeerContainer">
          <div className='randomBeerItem'>
            <img src={pic_url} className="randomImg" />
            <h3 className="randomBeerTxt">{beerName}</h3>
            <button className="btn btn-default" onClick={()=>this.addSampled(beerName)}>Mark It</button>
            <p className="randomBeerTxt">{beerDescription}</p>
          </div>
        </div>
      </div>
    )
  }
}

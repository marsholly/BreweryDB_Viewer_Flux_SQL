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
    this.updateBeer = this.updateBeer.bind(this);
    this.deleteBeer = this.deleteBeer.bind(this);
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

  updateBeer(id) {

  }

  deleteBeer(id) {

  }

  render() {
    let { sampledBeers } = this.state;
    let rows;
    if (sampledBeers) {
      rows = sampledBeers.map(sampledBeer => {
        let { beerName, id, marked, rate, comment } = sampledBeer;
          return (
            <tr key = {id}>
              <td><h4>{beerName}</h4></td>
              <td>{comment}</td>
              <td>{rate}</td>
              <td>{marked}</td>
              <td>
                <button className="btn btn-info btn-xs" onClick={this.updateBeer.bind(null,id)}>
                  <i className="glyphicon glyphicon-pencil"></i>
                </button>
              </td>
              <td>
                <button className="btn btn-danger btn-xs" onClick={this.deleteBeer.bind(null,id)}>
                  <i className="glyphicon glyphicon-trash"></i>
                </button>
              </td>
            </tr>
          )
      })
    } else {
      rows = <tr></tr>
    }

    return (
      <div className="container">
        <div className="row">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Beer Name</th>
                <th>Comment</th>
                <th>Rate</th>
                <th>Marked</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
};

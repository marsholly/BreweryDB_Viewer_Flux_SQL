import React, { Component } from 'react';
import BeerStore from '../stores/BeerStore';
import BeerActions from  '../actions/BeerActions';
import { Modal, Button } from 'react-bootstrap';

export default class SampledBeers extends Component {
  constructor() {
    super();
    this.state = {
      sampledBeers: BeerStore.getAllSampled(),
      editComment:'',
      editRate: 0,
      editMarked: 0,
      editId: null,
      editName: ''
    }

    this._onChange = this._onChange.bind(this);
    this.updateBeer = this.updateBeer.bind(this);
    this.deleteBeer = this.deleteBeer.bind(this);
    this.editBeer = this.editBeer.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
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

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  cancelEdit() {
    this.setState({editId: null});
    this.closeModal();
  }

  editBeer (sampledBeer) {
    this.openModal();
    this.setState({
      editName: sampledBeer.beerName,
      editComment: sampledBeer.comment,
      editRate: sampledBeer.rate,
      editMarked: sampledBeer.marked,
      editId: sampledBeer.id
    })
  }

  updateBeer(id) {
    let { editName , editComment, editRate, editMarked } = this.state;
    let newBeer = {
      name: editName,
      comment: editComment,
      rate: editRate,
      marked: editMarked,
      id
    }
    BeerActions.updateBeer(id, newBeer)
    this.closeModal();
    this.setState({ editId: null });
  }

  deleteBeer(id) {
    BeerActions.deleteBeer(id)
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
                <button className="btn btn-info btn-xs" onClick={this.editBeer.bind(null,sampledBeer)}>
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
        <Modal show={this.state.showModal} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label>Comment: </label>
                <input type="text" className="form-control" placeholder="Comment" value={this.state.editComment} onChange={e => { this.setState({editComment: e.target.value}) }}/>
              </div>
              <div className="form-group">
                <label>Rate: </label>
                <input type="number" className="form-control" placeholder="rate" value={this.state.editRate} onChange={e => { this.setState({editRate: e.target.value}) }}/>
              </div>
              <div className="form-group">
                <label>Marked: </label>
                <input type="text" className="form-control" placeholder="true/false" value={this.state.editMarked} onChange={e => { this.setState({editMarked: e.target.value}) }}/>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-primary" onClick={() => this.updateBeer(this.state.editId)}>Save</Button>
              <Button onClick={this.cancelEdit}>Close</Button>
            </Modal.Footer>
          </Modal>
      </div>
    )
  }
};

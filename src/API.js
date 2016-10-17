import ServerActions from './actions/ServerActions';
import axios from 'axios';

const API = {
  randomBeer() {
    axios.get('/api/beers/random')
      .then(res => res.data)
      .then(ServerActions.receiveRandomBeer)
      .catch(console.error)
  },
  getAllSampled() {
    axios.get('/api/users')
      .then(res =>res.data)
      .then(ServerActions.receiveAllSampled)
      .catch(console.error)
  },
  addSampled(sampleBeer) {
    axios.post('/api/users', sampleBeer)
      .then(res => res.data)
      .then(this.getAllSampled)
      .catch(console.error)
  },
  deleteBeer(id) {
    axios.delete(`/api/users/${id}`)
      .then(res => res.data)
      .then(this.getAllSampled)
      .catch(console.error)
  },
  updateBeer(id, newBeerInfo) {
    axios.put(`/api/users/${id}`, newBeerInfo)
      .then(res => res.data)
      .then(this.getAllSampled)
      .catch(console.error)
  }

}

export default API;

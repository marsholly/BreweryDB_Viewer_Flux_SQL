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
      .then(res =>
        console.log('res.data:', res.data)
        // res.data
      )
      .then(ServerActions.receiveAllSampled)
      .catch(console.error)
  },
  // addSampled(sampleBeer) {
  //   axios.post('/api/users', sampleBeer)
  //     .then(res => res.data)
  //     .then(this.getAllSampled)
  //     // .then(ServerActions.receiveAllSampled)
  //     // .catch(console.error)
  // }
}

export default API;

import API from '../API';

const BeerActions = {
  randomBeer() {
    API.randomBeer()
  },
  addSampled(sampleBeer) {
    API.addSampled(sampleBeer)
  }
}

export default BeerActions;

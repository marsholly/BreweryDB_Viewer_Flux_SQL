import API from '../API';

const BeerActions = {
  randomBeer() {
    API.randomBeer()
  },
  addSampled(sampleBeer) {
    API.addSampled(sampleBeer)
  },
  getAllSampled() {
    API.getAllSampled()
  },
  deleteBeer(id) {
    API.deleteBeer(id)
  },
  updateBeer(id, newBeerInfo) {
    API.updateBeer(id, newBeerInfo)
  }
}

export default BeerActions;

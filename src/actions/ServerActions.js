import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveRandomBeer(beers) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_RANDOM_BEER',
      payload: { beers }
    })
  },
  receiveAllSampled(beers) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ALL_SAMPLED',
      payload: { beers }
    })
  }
}

export default ServerActions;

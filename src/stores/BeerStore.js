import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';


let _beers = null;
let _sampledBeer = null;

class BeerStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'RECEIVE_RANDOM_BEER':
          _beers = action.payload.beers;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_ALL_SAMPLED':
          _beers = action.payload.beers;
          this.emit('CHANGE');
          break;
      }
    })
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAllBeers() {
    return _beers;
  }

  getAllSampled() {
    return _sampledBeer;
  }
}

export default new BeerStore();

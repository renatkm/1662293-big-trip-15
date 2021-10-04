import AbstractObserver from './abstract-observer.js';

class Destinations extends AbstractObserver {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(updateType, destinations) {
    this._destinations = destinations.slice();

    this._notify(updateType, this._destinations);
  }

  getDestinations() {
    return this._destinations;
  }
}

export default Destinations;

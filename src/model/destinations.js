import AbstractObserver from './abstract-observer.js';

export default class Destination extends AbstractObserver {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(updateType, destinations) {
    this._destinations = destinations.slice();
    console.log('set destinations');
    this._notify(updateType, this._destinations);
  }

  getDestinations() {
    return this._destinations;
  }
}

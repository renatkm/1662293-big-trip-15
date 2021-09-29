import AbstractObserver from './abstract-observer.js';

export default class Offers extends AbstractObserver {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(updateType, offers) {
    this._offers = offers.slice();

    this._notify(updateType, this._offers);
  }

  getOffers() {
    return this._offers;
  }
}

import AbstractObserver from './abstract-observer.js';

export default class Offers extends AbstractObserver {
  constructor(){
    super();
    this._offers = [];
  }

  setOffers(updateType, offers){
    this._points = offers.slice();
    this._notify(updateType);
  }

  getPoints(){
    return this._offers;
  }
}

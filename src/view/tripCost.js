import {createElement} from '../utils';

const createTripCostTemplate = () => `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
  </p>`;

export default class TripCost {
  constructor() {
    this._newElement = null;
  }

  getTemplate() {
    return createTripCostTemplate();
  }

  getElement() {
    if (!this._newElement){
      this._newElement = createElement(this.getTemplate());
    }

    return this._newElement;
  }

  removeElement() {
    this._newElement = null;
  }
}

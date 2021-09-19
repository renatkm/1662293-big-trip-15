import {createElement} from '../utils';

const createTripInfoTemplate = () => '<section class="trip-main__trip-info  trip-info"></section>';

export default class TripInfo {
  constructor() {
    this._newElement = null;
  }

  getTemplate() {
    return createTripInfoTemplate();
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

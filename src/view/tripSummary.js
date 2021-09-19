import {createElement} from '../utils';

const createTripSummaryTemplate = () => `<div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>`;

export default class TripSummary {
  constructor() {
    this._newElement = null;
  }

  getTemplate() {
    return createTripSummaryTemplate();
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

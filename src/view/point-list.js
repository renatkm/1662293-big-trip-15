import {createElement} from '../utils';

const createListTemplate =() => '<ul class="trip-events__list"></ul>';

export default class PointList {
  constructor() {
    this._newElement = null;
  }

  getTemplate() {
    return createListTemplate();
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

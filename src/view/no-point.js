import {createElement} from '../utils';

const createEmptyTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoPoint {
  constructor() {
    this._newElement = null;
  }

  getTemplate() {
    return createEmptyTemplate();
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

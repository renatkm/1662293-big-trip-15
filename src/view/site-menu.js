import {createElement} from '../utils';

const createMenuTemplate = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`;

export default class SiteMenu {
  constructor() {
    this._newElement = null;
  }

  getTemplate() {
    return createMenuTemplate();
  }

  getElement() {
    if (!this._newElement){
      this._newElement = createElement(this.getTemplate());
    }

    return this._newElement;
  }

  removeElement(){
    this._newElement = null;
  }
}

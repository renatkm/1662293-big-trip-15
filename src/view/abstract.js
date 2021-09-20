import {createElement} from '../utils/render.js';

export default class Abstract {
  constructor() {
    if (new.target === Abstract){
      throw new Error('Can\'t instantiate abstract class');
    }

    this._newElement = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
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

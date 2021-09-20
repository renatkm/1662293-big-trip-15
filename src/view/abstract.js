import {createElement} from '../utils/render.js';

export default class Abstract {
  constructor() {
    if (new.target === Abstract){
      throw new Error('Can\'t instantiate abstract class');
    }

    this._Element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  getElement() {
    if (!this._Element){
      this._Element = createElement(this.getTemplate());
    }

    return this._Element;
  }

  removeElement() {
    this._Element = null;
  }
}

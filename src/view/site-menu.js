import AbstractView from './abstract.js';
import {MenuItem} from '../const.js';

const createMenuTemplate = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn" href="#">${MenuItem.STATS}</a>
  </nav>`;

class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate();
  }

  setMenuItem(menuItem) {
    const items = this.getElement().querySelectorAll('.trip-tabs__btn');

    items.forEach((item) => {
      item.classList.remove('trip-tabs__btn--active');
    });

    menuItem.classList.add('trip-tabs__btn--active');
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target);
  }
}

export default SiteMenu;

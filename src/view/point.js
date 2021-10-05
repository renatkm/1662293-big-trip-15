import AbstractView from './abstract.js';
import {getTimePart, getHumanizedDiffTime, getDatePart, getHumanizedDate} from '../utils/common.js';

const createOfferListTemplate = (offers) => {
  if (offers === null) {
    return '';
  }

  return offers.map(({title, price}) => `<li class="event__offer">
  <span class="event__offer-title">${title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
</li>`).join('');
};

const createPointTemplate = (point) =>  {
  const {
    type = '',
    destination = null,
    arrivalTime = null,
    departureTime = null,
    basePrice = 0,
    offers = null,
    isFavorite = false,
  } = point;

  const offerListTemplate = createOfferListTemplate(offers);
  const classIsFavorite = isFavorite ? 'event__favorite-btn--active' : '';

  return `<li class="trip-events__item">
<div class="event">
  <time class="event__date" datetime="${getDatePart(arrivalTime)}">${getHumanizedDate(arrivalTime)}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${type} ${destination.name}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${arrivalTime}">${getTimePart(arrivalTime)}</time>
      &mdash;
      <time class="event__end-time" datetime="${departureTime}">${getTimePart(departureTime)}</time>
    </p>
    <p class="event__duration">${getHumanizedDiffTime(departureTime, arrivalTime)}</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${offerListTemplate}
  </ul>
  <button class="event__favorite-btn ${classIsFavorite}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>
</li>`;
};

export default class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
    this._pointClickHandler = this._pointClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  setPointClickHandler(callback) {
    this._callback.pointClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._pointClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }

  _pointClickHandler(evt) {
    evt.preventDefault();
    this._callback.pointClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}

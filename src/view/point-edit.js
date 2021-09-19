import {DESTINATIONS, POINT_TYPES} from '../const.js';
import {getOfferListByPointType, getHumanizedDateTime, createElement} from '../utils.js';

const createPointEditTypesTemplate = (pointName) =>POINT_TYPES.map((pointType) => {
  const className = pointType.toLowerCase();

  return `<div class="event__type-item">
    <input id="event-type-${className}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${className}" ${pointType === pointName ? 'checked' : ''}>
    <label class="event__type-label event__type-label--${className}" for="event-type-${className}-1">${pointType}</label>
    </div>`;
}).join('');

const createPointEditDestinationTemplate = (destination) => `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
  <datalist id="destination-list-1">
    ${DESTINATIONS.map((city) => `<option value="${city}"></option>`).join('')}
  </datalist>`;

const generateClassName = (offerName) => offerName.replace(/\s+/gm, '-').toLowerCase();

const isOfferChecked = (offer, checkedOffers) => checkedOffers ? checkedOffers.some((checkedOffer) => checkedOffer.name === offer.name) : false;

const createPointEditOffersTemplate = (availableOffers, checkedOffers) => (
  `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
    ${
  availableOffers.map((offer, index) => {
    const className = generateClassName(offer.name);
    const isChecked = isOfferChecked(offer, checkedOffers);

    return `
      <div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden" id="event-offer-${className}-${index}" type="checkbox" name="event-offer-${className}" ${isChecked ? 'checked': ''}>
          <label class="event__offer-label" for="event-offer-${className}-${index}">
           <span class="event__offer-title">${offer.name}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.cost}</span>
        </label>
      </div>
      `;
  })
  }
    </div>
  </section>`
);

const createPointEditDescriptionTemplate = (description, photos) => {
  if (!description){
    return '';
  }

  const photosTemplate = photos.map((url) => `<img class="event__photo" src="${url}" alt="Event photo"></img>`).join('');

  return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photosTemplate}
        </div>
      </div>
    </section>`;
};

const createPointEditTemplate = (point) => {
  const {
    destination = '',
    pointType = '',
    arrivalTime = null,
    departureTime = null,
    description = '',
    cost = 0,
    offers = null,
    photos = null,
  } = point;

  const pointTypesTemplate = createPointEditTypesTemplate(pointType);
  const availableOffers = getOfferListByPointType(pointType);
  const offersTemplate = availableOffers ? createPointEditOffersTemplate(availableOffers, offers) : '';
  const destinationsTemplate = createPointEditDestinationTemplate(destination);
  const descriptionTemplate = createPointEditDescriptionTemplate(description, photos);
  const className = pointType.toLowerCase();

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${className}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${pointTypesTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${pointType}
        </label>
        ${destinationsTemplate}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getHumanizedDateTime(arrivalTime)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getHumanizedDateTime(departureTime)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${offersTemplate}
      ${descriptionTemplate}
    </section>
  </form>
</li> `;
};

export default class PointEdit {
  constructor(point) {
    this._point = point;
    this._newElement = null;
  }

  getTemplate() {
    return createPointEditTemplate(this._point);
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

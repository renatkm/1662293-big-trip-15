import SmartView from './smart.js';
import {DESTINATIONS, POINT_TYPES} from '../const.js';
import {getHumanizedDateTime} from '../utils/common.js';
import {getOfferListByPointType} from '../utils/point.js';
import {generateDescription, getPhotos} from '../mock/point.js';

const createPointEditTypesTemplate = (pointTypes) =>pointTypes.map((point) => {
  const {name, className, isChecked} = point;

  return `<div class="event__type-item">
    <input id="event-type-${className}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${className}" ${isChecked ? 'checked' : ''}>
    <label class="event__type-label event__type-label--${className}" for="event-type-${className}-1">${name}</label>
    </div>`;
}).join('');

const createPointEditDestinationTemplate = (destination) => `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
  <datalist id="destination-list-1">
    ${DESTINATIONS.map((city) => `<option value="${city}"></option>`).join('')}
  </datalist>`;

const generateClassName = (offerName) => offerName.replace(/\s+/gm, '-').toLowerCase();

const isOfferChecked = (offer, checkedOffers) => checkedOffers ? checkedOffers.some((checkedOffer) => checkedOffer.name === offer.name) : false;

const createPointEditOffersTemplate = (offers) => (
  `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
    ${
  offers.map((offer, index) => `
      <div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.className}-${index}" type="checkbox" name="event-offer-${offer.className}" ${offer.isChecked ? 'checked': ''}>
          <label class="event__offer-label" for="event-offer-${offer.className}-${index}">
           <span class="event__offer-title">${offer.name}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.cost}</span>
        </label>
      </div>
      `).join('')
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

const createPointEditTemplate = (data) => {
  const {
    destination = '',
    pointType = '',
    pointTypes = null,
    arrivalTime = null,
    departureTime = null,
    description = '',
    cost = 0,
    enhancedOffers = null,
    photos = null,
  } = data;

  const pointTypesTemplate = createPointEditTypesTemplate(pointTypes);
  const offersTemplate = enhancedOffers.length ? createPointEditOffersTemplate(enhancedOffers) : '';
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

export default class PointEdit extends SmartView {
  constructor(point) {
    super();
    this._data = PointEdit.parsePointToData(point);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._pointClickHandler = this._pointClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPointEditTemplate(this._data);
  }

  _typeChangeHandler(evt) {
    if (evt.target.tagName === 'INPUT') {
      this.updateData(
        {
          pointType: evt.target.value,
          offers: getOfferListByPointType(evt.target.value),
        },
      );
    }
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData(
      {
        destination: evt.target.value,
        description: generateDescription(),
        photos: getPhotos(),
      },
    );
  }

  reset(point) {
    this.updateData(
      PointEdit.parsePointToData(point),
    );
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-list').addEventListener('click', this._typeChangeHandler);
    this.getElement().querySelector('.event__input').addEventListener('change', this._destinationChangeHandler);
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._pointClickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
  }

  _pointClickHandler(evt) {
    evt.preventDefault();
    this._callback.pointClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setPointClickHandler(callback) {
    this._callback.pointClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._pointClickHandler);
  }

  static parsePointToData(point) {
    let availableOffers = getOfferListByPointType(point.pointType);

    if (!availableOffers){
      availableOffers = [];
    }

    return Object.assign(
      {},
      point,
      {
        enhancedOffers: availableOffers.map((availableOffer) => Object.assign(
          {},
          availableOffer,
          {
            isChecked: isOfferChecked(availableOffer, point.offers),
            className: generateClassName(availableOffer.name),
          },
        )),
        pointTypes: POINT_TYPES.map((pointName) => (
          {
            name: pointName,
            isChecked: point.pointType === pointName,
            className: pointName.toLowerCase(),
          }),
        ),
      },
    );
  }

  static parseDataToPoint(data) {
    const point = Object.assign(
      {},
      data,
      {
        offers: data.enhancedOffers.filter((offer) => offer.isChecked).map((offer) => ({
          name: offer.name,
          cost: offer.cost,
        })),
        pointType: data.pointTypes.filter((pt) => pt.isChecked)[0].name,
      },
    );

    delete point.enhancedOffers;
    delete point.pointTypes;

    return point;
  }
}

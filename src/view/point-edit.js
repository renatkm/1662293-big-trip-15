import SmartView from './smart.js';
import flatpickr  from 'flatpickr';
import {getHumanizedDateTime, getPascalName} from '../utils/common.js';
import {getOfferListByPointType, getDestinationOrNull} from '../utils/point.js';
import {formValidation} from '../utils/form-validation.js';
import {EMPTY_POINT} from '../mock/point.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createPointEditTypesTemplate = (pointTypeName, allOffers, id) =>allOffers.map((item) => {
  const className = item.type.toLowerCase();
  const isChecked = item.type === pointTypeName;

  return `<div class="event__type-item">
    <input 
      id="event-type-${className}-${id}" 
      class="event__type-input visually-hidden" 
      type="radio" name="event-type" 
      data-type="${item.type}" 
      value="${className}" ${isChecked ? 'checked' : ''}>
    <label class="event__type-label event__type-label--${className}" for="event-type-${className}-${id}">${getPascalName(item.type)}</label>
    </div>`;
}).join('');

const createDestinationTemplate = (destination, availableDestinations = [], id) => {
  const name = destination? destination.name: '';

  return `<input 
    class="event__input  
    event__input--destination" 
    id="event-destination-${id}" type="text" 
    name="event-destination" 
    value="${name}" required 
    list="destination-list-${id}">
    <datalist id="destination-list-${id}">
    ${availableDestinations.map((city) => `<option value="${city.name}"></option>`).join('')}
  </datalist>`;
};

const generateClassName = (offerName) => offerName.replace(/\s+/gm, '-').toLowerCase();

const isOfferChecked = (offer, checkedOffers) => checkedOffers ? checkedOffers.some((checkedOffer) => checkedOffer.title.toLowerCase() === offer.title.toLowerCase()) : false;

const createPointEditOffersTemplate = (availableOffers, checkedOffers, id) => (
  `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
    ${availableOffers.map((offer) => {
    const isChecked = isOfferChecked(offer, checkedOffers) ? 'checked' : '';
    const className = generateClassName(offer.title);
    return `
      <div class="event__offer-selector">
          <input 
            class="event__offer-checkbox visually-hidden" 
            data-title="${offer.title.toLowerCase()}" data-price="${offer.price}" 
            id="event-offer-${className}-${id}" type="checkbox" 
            data-offer="${offer.title}" 
            name="event-offer-${className}" ${isChecked}>
          <label class="event__offer-label" for="event-offer-${className}-${id}">
           <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
      `;}).join('')
  }
        </div>
    </section>`
);

const createPointEditDescriptionTemplate = (destination) => {
  if (!destination){
    return '';
  }

  const {
    pictures = [],
    description = '',
  } = destination;

  return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}}"></img>`).join('')}
        </div>
      </div>
    </section>`;
};

const createPointEditTemplate = (data, allOffers, allDestinations, isNewPoint) => {
  const {
    id,
    destination,
    type,
    arrivalTime,
    departureTime,
    basePrice,
    offers,
  } = data;

  const availableOffers = getOfferListByPointType(data.type, allOffers);
  const pointTypesTemplate = createPointEditTypesTemplate(type, allOffers, id);
  const offersTemplate = availableOffers.length ? createPointEditOffersTemplate(availableOffers, offers, id) : '';
  const destinationsTemplate = createDestinationTemplate(destination, allDestinations, id);
  const descriptionTemplate = createPointEditDescriptionTemplate(destination);
  const className = type.toLowerCase();
  const resetButtonName = isNewPoint? 'Cancel' : 'Delete';

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${className}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${pointTypesTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${id}">
          ${type}
        </label>
        ${destinationsTemplate}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${getHumanizedDateTime(arrivalTime)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${getHumanizedDateTime(departureTime)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" required value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${resetButtonName}</button>
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
  constructor(data) {
    super();
    const {point = EMPTY_POINT, offers, destinations} = data;

    this._data = PointEdit.parsePointToData(point);
    this._allOffers = offers;
    this._allDestinations = destinations;
    this._isNewPoint = !data.point;

    this._datepickerFrom = null;
    this._datepickerTo = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._pointClickHandler = this._pointClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._basePriceChangeHandler = this._basePriceChangeHandler.bind(this);
    this._arrivalTimeChangeHandler = this._arrivalTimeChangeHandler.bind(this);
    this._departureTimeChangeHandler = this._departureTimeChangeHandler.bind(this);
    this._offerClickHandler = this._offerClickHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickers();
  }

  getTemplate() {
    return createPointEditTemplate(this._data, this._allOffers, this._allDestinations, this._isNewPoint);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setPointClickHandler(callback) {
    this._callback.pointClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._pointClickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  removeElement() {
    super.removeElement();

    if (this._datepickerFrom) {
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }
    if(this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
    }
  }

  reset(point) {
    this.updateData(
      PointEdit.parsePointToData(point),
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _pointClickHandler(evt) {
    evt.preventDefault();
    this._callback.pointClick();
  }

  _typeChangeHandler(evt) {
    if (evt.target.tagName === 'INPUT') {
      this.updateData(
        {
          type: evt.target.dataset.type,
          availableOffers: getOfferListByPointType(evt.target.dataset.type),
          offers: [],
        },
      );
    }
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    const newDestination = getDestinationOrNull(evt.target.value, this._allDestinations);

    if (!newDestination){
      evt.target.setCustomValidity('Please select an other city');
      evt.target.reportValidity();
      return;
    }

    evt.target.setCustomValidity('');
    this.updateData(
      {
        destination: newDestination,
      },
    );
  }

  _basePriceChangeHandler(evt) {
    const priceInput = evt.target.value;
    const isNotNumber = isNaN(priceInput);
    evt.preventDefault();
    if (priceInput <= 0 || isNotNumber) {
      evt.target.setCustomValidity('Please use only positive numbers');
    } else {
      evt.target.setCustomValidity('');
      this.updateData(
        {
          basePrice: + evt.target.value,
        },
        true,
      );
    }
    evt.target.reportValidity();
  }

  _setDatepickers() {
    this._setDatepickerFrom();
    this._setDatepickerTo();
  }

  _setDatepickerFrom() {
    this._datepickerFrom = flatpickr(
      this.getElement().querySelector('[name = "event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._data.arrivalTime,
        onChange: this._arrivalTimeChangeHandler,
      },
    );
  }

  _setDatepickerTo() {
    this._datepickerTo = flatpickr(
      this.getElement().querySelector('[name = "event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        minDate: this._data.arrivalTime,
        defaultDate: this._data.departureTime,
        onChange: this._departureTimeChangeHandler,
      },
    );
  }

  _arrivalTimeChangeHandler([userDate]) {
    this.updateData(
      {
        arrivalTime: userDate,
      },
    );
  }

  _departureTimeChangeHandler([userDate]) {
    this.updateData(
      {
        departureTime: userDate,
      },
    );
  }

  _offerClickHandler(evt) {
    evt.preventDefault();
    const offerElementsList = this.getElement().querySelectorAll('.event__offer-checkbox');
    const currentOffers = [];

    offerElementsList.forEach((offer) => {
      if(offer.checked) {
        currentOffers.push({
          title: offer.dataset.title,
          price: Number(offer.dataset.price),
        });
      }
    });

    this.updateData(
      {
        offers: currentOffers,
      },
    );
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    formValidation(evt);

    if (evt.target.checkValidity()){
      this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
    }
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEdit.parseDataToPoint(this._data));
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-list').addEventListener('click', this._typeChangeHandler);
    this.getElement().querySelector('.event__input').addEventListener('change', this._destinationChangeHandler);
    this.getElement().querySelector('.event__input--price').addEventListener('input', this._basePriceChangeHandler);
    this.getElement().querySelector('.event__section').addEventListener('change', this._offerClickHandler);

    const closeEditFormElement = this.getElement().querySelector('.event__rollup-btn');
    if (closeEditFormElement){
      closeEditFormElement.addEventListener('click', this._pointClickHandler);
    }
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
    );
  }

  static parseDataToPoint(data) {
    const point = Object.assign(
      {},
      data,
    );

    return point;
  }
}

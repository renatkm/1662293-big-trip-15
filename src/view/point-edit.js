import SmartView from './smart.js';
import flatpickr  from 'flatpickr';
import {DESTINATIONS, POINT_TYPES} from '../const.js';
import {getHumanizedDateTime} from '../utils/common.js';
import {getOfferListByPointType, getDestinationOrDefault} from '../utils/point.js';
import {formValidation} from '../utils/form-validation.js';
import {EMPTY_POINT} from '../mock/point.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createPointEditTypesTemplate = (type) =>POINT_TYPES.map((pointType) => {
  const className = pointType.toLowerCase();
  const isChecked = pointType === type;

  return `<div class="event__type-item">
    <input 
      id="event-type-${className}-1" 
      class="event__type-input visually-hidden" 
      type="radio" name="event-type" 
      data-type="${pointType}" 
      value="${className}" ${isChecked ? 'checked' : ''}>
    <label class="event__type-label event__type-label--${className}" for="event-type-${className}-1">${pointType}</label>
    </div>`;
}).join('');

const createPointEditDestinationTemplate = (destination) => {
  const {
    name = '',
  } = destination;

  return `<input 
    class="event__input  
    event__input--destination" 
    id="event-destination-1" type="text" 
    name="event-destination" 
    value="${name}" required 
    list="destination-list-1">
    <datalist id="destination-list-1">
    ${DESTINATIONS.map((city) => `<option value="${city.name}"></option>`).join('')}
  </datalist>`;
};

const generateClassName = (offerName) => offerName.replace(/\s+/gm, '-').toLowerCase();

const isOfferChecked = (offer, checkedOffers) => checkedOffers ? checkedOffers.some((checkedOffer) => checkedOffer.name === offer.name) : false;

const createPointEditOffersTemplate = (availableOffers, checkedOffers) => (
  `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
    ${availableOffers.map((offer, index) => {
    const isChecked = isOfferChecked(offer, checkedOffers) ? 'checked' : '';
    const className = generateClassName(offer.name);
    return `
      <div class="event__offer-selector">
          <input 
            class="event__offer-checkbox visually-hidden" 
            id="event-offer-${className}-${index}" type="checkbox" 
            data-offer="${offer.name}" 
            name="event-offer-${className}" ${isChecked}>
          <label class="event__offer-label" for="event-offer-${className}-${index}">
           <span class="event__offer-title">${offer.name}</span>
            &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.cost}</span>
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
    photos = [],
    description = '',
  } = destination;

  return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photos.map((url) => `<img class="event__photo" src="${url}" alt="Event photo"></img>`).join('')}
        </div>
      </div>
    </section>`;
};

const createPointEditTemplate = (data) => {
  const {
    destination = null,
    type = '',
    arrivalTime = null,
    departureTime = null,
    basePrice = 0,
    offers = [],
    availableOffers = [],
  } = data;

  const pointTypesTemplate = createPointEditTypesTemplate(type);
  const offersTemplate = availableOffers.length ? createPointEditOffersTemplate(availableOffers, offers) : '';
  const destinationsTemplate = createPointEditDestinationTemplate(destination);
  const descriptionTemplate = createPointEditDescriptionTemplate(destination);
  const className = type.toLowerCase();

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
          ${type}
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
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" required value="${basePrice}">
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
  constructor(point = EMPTY_POINT) {
    super();
    this._data = PointEdit.parsePointToData(point);

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
    return createPointEditTemplate(this._data);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setPointClickHandler(callback) {
    this._callback.pointClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._pointClickHandler);
  }

  setOfferClickHandler(callback) {
    this._callback.offerClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._pointClickHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  setBasePriceClickHandler(callback) {
    this._callback.pointClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._basePriceClickHandler);
  }

  setArrivalTimeClickHandler(callback) {
    this._callback.pointClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._arrivalTimeChangeHandler);
  }

  setDepartureTimeClickHandler(callback) {
    this._callback.pointClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._departureTimeChangeHandler);
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
    const newDestination = getDestinationOrDefault(evt.target.value, false);

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
    if (evt.target.tagName === 'INPUT') {
      const selectedOffers = this._data.offers;
      const clickedOffer = this._data.availableOffers.find((offer) => offer.name === evt.target.dataset.offer);
      const selectedIndex = selectedOffers.length ? selectedOffers.findIndex((selected) => selected.name === evt.target.dataset.offer): -1;
      if (selectedIndex !== -1) {
        selectedOffers.splice(selectedIndex, 1);
      }
      else{
        selectedOffers.push(clickedOffer);
      }

      this.updateData(
        {
          offers: selectedOffers,
        },
      );
    }
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
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._pointClickHandler);

    const offersElement = this.getElement().querySelector('.event__available-offers');
    if (offersElement){
      offersElement.addEventListener('click', this._offerClickHandler);
    }
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        availableOffers: getOfferListByPointType(point.type),
      },
    );
  }

  static parseDataToPoint(data) {
    const point = Object.assign(
      {},
      data,
    );

    delete point.availableOffers;
    return point;
  }
}

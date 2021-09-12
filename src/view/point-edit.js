import { DestinationList, PointTypeList } from '../const.js';
import { getOfferListByEventType } from '../utils.js';

const createPointEditPointTypesTemplate = (pointName) =>PointTypeList.map((pointType) => {
  const className = pointName.toLowerCase();

  return `<div class="event__type-item">
    <input id="event-type-${className}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${className}" ${pointType === pointName ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${className}" for="event-type-${className}-1">${pointName}</label>
    </div>`;
}).join('');

const createPointEditDestinatioTemplate = (destination) => `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
  <datalist id="destination-list-1">
    ${DestinationList.map((city) => `<option value="${city}"></option>`).join('')}
  </datalist>`;

const createPointEditOfferTemplate = (offer, isChecked) => {
  const {
    Name = '',
    ClassName = '',
    Cost = 0,
  } = offer;

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-${ClassName}" ${isChecked ? 'checked': ''}>
  <label class="event__offer-label" for="event-offer-${ClassName}-1">
    <span class="event__offer-title">${Name}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${Cost}</span>
  </label>
  </div>`;
};

const createPointEditOffersTemplate = (offers, eventType) => {
  const availableOffers = getOfferListByEventType(eventType);
  const notCheckedOffers = offers !== null ? availableOffers.filter((ele)=> !offers.includes(ele)): availableOffers;

  return `<div class="event__available-offers">
  ${offers !==null ? offers.map((offer) => createPointEditOfferTemplate(offer, true)).join('') :''}
  ${notCheckedOffers.map((offer) => createPointEditOfferTemplate(offer, false) ).join('')}
  </div>`;
};

const createDestinationPhotosTemplate = (photos) => photos.map((url) => `<img class="event__photo" src="${url}" alt="Event photo"></img>`).join('');

export const createPointEditTemplate = (point = {}) => {
  const {
    Destination= '',
    PointType = '',
    ArrivalTime = null,
    DepartureTime = null,
    Description= '',
    Cost= 0,
    Offers= null,
    Photos = null,
  } = point;

  const pointTypesTemplate = createPointEditPointTypesTemplate(PointType);
  const offersTemplate = createPointEditOffersTemplate(Offers, PointType);
  const destinationsTemplate = createPointEditDestinatioTemplate(Destination);
  const destinationPhotosTemplate = createDestinationPhotosTemplate(Photos);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${PointType}.png" alt="Event type icon">
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
          ${PointType}
        </label>
        ${destinationsTemplate}
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${ArrivalTime}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${DepartureTime}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${Cost}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        ${offersTemplate}
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${Description}</p>

        <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${destinationPhotosTemplate}
                        <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
                        <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
                        <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
                        <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
                      </div>
                    </div>
      </section>
    </section>
  </form>
</li> `;
};


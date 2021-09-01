import dayjs from 'dayjs';

const humanizedTimeInterval = (dateFrom, dateTo) =>{
  const minutes = dayjs(dateTo).diff(dateFrom, 'minutes');
  const hours = Math.floor(minutes/60);
  const days = Math.floor(hours/24);

  return (`${days  }D  ${  hours  }H ${  minutes %60  }M`)
    .replace('0D', '')
    .replace(' 0H', '')
    .replace(' 0M', '').trim();
};

const createOfferItem = (offer) => {
  const {Name, Cost} = offer;

  return `<li class="event__offer">
  <span class="event__offer-title">${Name}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${Cost}</span>
  </li>`;
};

const createOffersList = (offers) =>{

  if (offers === null || offers.lenght === 0){
    return '';
  }

  const offerListElements = offers.map((offer) => createOfferItem(offer)).join('');
  return `<ul class="event__selected-offers">
  ${offerListElements}
  </ul>`;
};

export const createPointComponent = (point) => {
  const {EventType, Destination, ArrivalTime, DepartureTime, Cost, Offers} = point;

  const arrDate = dayjs(ArrivalTime).format('MMM D');
  const arrTime = dayjs(ArrivalTime).format('HH:mm');
  const depTime = dayjs(DepartureTime).format('HH:mm');

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${arrDate}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${EventType} ${Destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${ArrivalTime}">${arrTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${DepartureTime}}">${depTime}</time>
      </p>
      <p class="event__duration">${humanizedTimeInterval(ArrivalTime, DepartureTime)}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${Cost}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${createOffersList(Offers)}
    <button class="event__favorite-btn event__favorite-btn--active" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>
`;
};

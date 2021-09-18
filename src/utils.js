import dayjs from 'dayjs';
import {OFFERS} from './const.js';

const MINUTES_IN_A_DAY_NUMBER = 1440;
const MINUTES_IN_A_HOUR_NUMBER = 60;

export const getRandomInteger = (a = 0, b = 1) =>{
  const lBound = Math.ceil(Math.min(a, b));
  const uBound = Math.floor(Math.max(a, b));

  return Math.floor(lBound+ Math.random()*(uBound - lBound+1));
};

export const getRandomItem = (collection) => collection[getRandomInteger(0, collection.length-1)];

export const getOfferListByPointType = (pointType) =>  {
  const filteredOffers = OFFERS.find((offer) => offer.type === pointType);

  return  filteredOffers ? filteredOffers.offers : null;
};

export const getTimePart = (datetime) => dayjs(datetime).format('HH:mm');

export const getDatePart = (datetime) => dayjs(datetime).format('YYYY-MM-DD');

export const getHumanizedDate = (datetime) => dayjs(getDatePart(datetime)).format('MMM-DD');

export const getHumanizedDateTime = (datetime) => dayjs(datetime).format('DD/MM/YY HH:mm');

export const getDiffTime = (datetime1, datetime2) =>{
  let diff = dayjs(datetime1).diff(dayjs(datetime2), 'minute');
  const days = Math.floor(diff/MINUTES_IN_A_DAY_NUMBER);
  diff = diff % MINUTES_IN_A_DAY_NUMBER;
  const hours = Math.floor(diff/MINUTES_IN_A_HOUR_NUMBER);
  const minutes = (diff % MINUTES_IN_A_HOUR_NUMBER);

  return  `${days ? `${days}D ` : ''}${hours ? `${hours}H ` : ''}${minutes ? `${minutes}M` : ''}`.trim();
};

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch(place){
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

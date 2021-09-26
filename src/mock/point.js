import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger, getRandomItem} from '../utils/common.js';
import {getOfferListByPointType} from '../utils/point.js';
import {POINT_TYPES, DESTINATIONS} from '../const.js';

const getRandomPointType= () => getRandomItem(POINT_TYPES);

const getRandomDestination= () => getRandomItem(DESTINATIONS);

const generateTime = (startTime) => {
  const intervalLengthMinutes = 15;
  const maxIntervalLengthMinutes= 2*24*60;
  const maxIntervalsNumber = Math.floor(maxIntervalLengthMinutes/intervalLengthMinutes);

  if (!startTime){
    startTime = dayjs();
    startTime = startTime.add(intervalLengthMinutes- (startTime.minute() % intervalLengthMinutes), 'minutes');
  }

  const interval = getRandomInteger(1, maxIntervalsNumber)*intervalLengthMinutes;

  return startTime.add(interval, 'minutes');
};

const getAnyOffers = (pointType) => {
  const availableOffers = getOfferListByPointType(pointType);
  if (!availableOffers){
    return [];
  }

  const maxNumberOfOffers = availableOffers.length;
  const numberOfOffers = getRandomInteger(0, Math.min(maxNumberOfOffers-1, 4));

  if (numberOfOffers === 0){
    return [];
  }

  const offers = new Set();

  while (offers.size < numberOfOffers) {
    offers.add(getRandomItem(availableOffers));
  }

  return Array.from(offers);
};

export const generateText = () => {
  const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

  const sentenses = Array.from(TEXT.split('.'));
  const n = getRandomInteger(1,5);
  return `${new Array(n).fill().map(() => sentenses[getRandomInteger(0, sentenses.length-1)]).join('.').trimStart()  }.`;
};

export const getPhotos = () => {
  const imagesNumber = getRandomInteger(0,5);

  return new Array(imagesNumber).fill().map(() => `http://picsum.photos/248/152?r=${getRandomInteger(0,1024)}`);
};

export const  generatePoint = () => {
  const arrivalTime = generateTime(dayjs());
  const departureTime = generateTime(arrivalTime);
  const pointType = getRandomPointType();

  return {
    id: nanoid(),
    destination: getRandomDestination(),
    type : pointType,
    arrivalTime : arrivalTime.toDate(),
    departureTime : departureTime.toDate(),
    basePrice: getRandomInteger(0, 300),
    isFavorite: false,
    offers: getAnyOffers(pointType),
  };
};

export const EMPTY_POINT = {
  id : nanoid(),
  destination : 'Geneva',
  type: 'Restaurant',
  arrivalTime: dayjs().startOf('day').add(1, 'day').toDate(),
  departureTime: dayjs().startOf('day').add(2, 'day').toDate(),
  basePrice: null,
  isFavorite: false,
  offers: [],
};

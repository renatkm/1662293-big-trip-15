import dayjs from 'dayjs';
import {getRandomInteger, getRandomItem, getOfferListByPointType} from '../utils.js';
import {POINT_TYPES, DESTINATIONS} from '../const.js';

const generateDescription = () => {
  const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

  const sentenses = Array.from(TEXT.split('.'));
  const n = getRandomInteger(1,5);
  return `${new Array(n).fill().map(() => sentenses[getRandomInteger(0, sentenses.length-1)]).join('.').trimLeft()  }.`;
};

const getRandomPointType= () =>getRandomItem(POINT_TYPES);

const getRandomDestination= () =>getRandomItem(DESTINATIONS);

const generateArrivalTime = (startTime) => {
  if (!startTime){
    startTime = dayjs();
    startTime = startTime.add(15- (startTime.minute() % 15), 'minutes');
  }

  const intervals30m = getRandomInteger(1, 96)*15;
  return startTime.add(intervals30m, 'minutes');
};

const getAnyOffers = (pointType) =>{
  const availableOffers =getOfferListByPointType(pointType);
  if (!availableOffers){
    return null;
  }

  const maxNumberOfOffers = availableOffers.length;
  const numberOfOffers = getRandomInteger(0, Math.min(maxNumberOfOffers-1, 4));

  if (numberOfOffers===0){
    return null;
  }

  const offers = new Set();

  while (offers.size < numberOfOffers) {
    offers.add(getRandomItem(availableOffers));
  }

  return Array.from(offers);
};

const getPhotos = () => {
  const imagesNumber = getRandomInteger(1,5);
  return new Array(imagesNumber).fill().map(() => `http://picsum.photos/248/152?r=${getRandomInteger(0,1024)}`);
};

export const  generatePoint = (prevPoint) => {
  const {Destination, DepartureTime} = !prevPoint ?
    {
      Destination : getRandomDestination(),
      DepartureTime: null,
    }
    : prevPoint;

  const arrivalTime = generateArrivalTime(DepartureTime);
  const departureTime = generateArrivalTime(arrivalTime);
  const pointType = getRandomPointType();

  return {
    Name : pointType,
    Origin: Destination,
    Destination: getRandomDestination(),
    PointType : pointType,
    ArrivalTime : arrivalTime,
    DepartureTime : departureTime,
    Description: generateDescription(),
    Cost: getRandomInteger(0, 300),
    IsFavorite: false,
    Offers: getAnyOffers(pointType),
    Photos: getPhotos(),
  };
};

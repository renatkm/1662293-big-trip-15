import dayjs from 'dayjs';

export const getDiffTime = (arrivalTime, departureTime) => {
  const now = dayjs();
  const date2 =  departureTime ? dayjs(departureTime) : now;
  const date1 = arrivalTime ? dayjs(arrivalTime) : now;

  return date2.diff(date1);
};

export const getOfferListByPointType = (pointTypeName, allOffers = []) =>  {
  if (!pointTypeName) {
    return [];
  }

  const filteredOffers = allOffers.find((offer) => offer.type === pointTypeName);

  return  filteredOffers ? filteredOffers.offers : [];
};

export const getDestinationOrNull = (cityName, allDestinations = []) => {
  if (!cityName) {
    return null;
  }

  return allDestinations.find(({name}) => name.toLowerCase() === cityName.toLowerCase());
};

export const comparePointBasePrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const comparePointDate = (pointA, pointB) => getDiffTime(pointB.arrivalTime, pointA.arrivalTime);

export const comparePointLength = (pointA, pointB) => getDiffTime(pointB.arrivalTime, pointB.departureTime) - getDiffTime(pointA.arrivalTime, pointA.departureTime);

export const isFuturePoint = (datetime) => getDiffTime(null, datetime) > 0;

export const isPastPoint = (datetime) => getDiffTime(datetime, null) > 0;

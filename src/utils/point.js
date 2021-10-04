import {getDiffTime} from './common.js';

const getOfferListByPointType = (pointTypeName, allOffers = []) =>  {
  if (!pointTypeName) {
    return [];
  }

  const filteredOffers = allOffers.find((offer) => offer.type === pointTypeName);

  return filteredOffers ? filteredOffers.offers : [];
};

const getDestinationOrNull = (cityName, allDestinations = []) => {
  if (!cityName) {
    return null;
  }

  return allDestinations.find(({name}) => name.toLowerCase() === cityName.toLowerCase());
};

const comparePointBasePrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const comparePointDate = (pointA, pointB) => getDiffTime(pointB.arrivalTime, pointA.arrivalTime);

const comparePointLength = (pointA, pointB) => getDiffTime(pointB.arrivalTime, pointB.departureTime) - getDiffTime(pointA.arrivalTime, pointA.departureTime);

const isFuturePoint = (datetime) => getDiffTime(null, datetime) > 0;

const isPastPoint = (datetime) => getDiffTime(datetime, null) > 0;

export {
  getOfferListByPointType,
  getDestinationOrNull,
  comparePointBasePrice,
  comparePointDate,
  comparePointLength,
  isFuturePoint,
  isPastPoint};

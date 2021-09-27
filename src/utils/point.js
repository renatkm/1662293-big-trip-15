import {getDiffTime} from './common.js';

export const getOfferListByPointType = (pointTypeName, allOffers = []) =>  {
  if (!pointTypeName) {
    return [];
  }

  const filteredOffers = allOffers.find((offer) => offer.type === pointTypeName);

  return  filteredOffers ? filteredOffers.offers : [];
};

export const getDestinationOrNull = (cityName, allDestinations = []) =>{
  if (!cityName) {
    return null;
  }

  return allDestinations.find(({name}) => name.toLowerCase() === cityName.toLowerCase());
};

export const updatePoints = (points, point) => {
  const index = points.findIndex((item) => item.id===point.id);
  if (index === -1){
    return;
  }

  return [
    ...points.slice(0, index),
    point,
    ...points.slice(index + 1),
  ];
};

export const comparePointBasePrice = (pointA, pointB) => pointA.basePrice - pointB.basePrice;

export const comparePointDate = (pointA, pointB) => getDiffTime(pointB.arrivalTime, pointA.arrivalTime);

export const comparePointLength = (pointA, pointB) => getDiffTime(pointA.arrivalTime, pointA.departureTime) - getDiffTime(pointB.arrivalTime, pointB.departureTime);

export const isFuturePoint = (datetime) => getDiffTime(null, datetime) > 0;

export const isPastPoint = (datetime) => getDiffTime(datetime, null) > 0;

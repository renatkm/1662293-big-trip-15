import {OFFERS} from '../const.js';
import {getDiffTime} from './common.js';

export const getOfferListByPointType = (pointType) =>  {
  const filteredOffers = OFFERS.find((offer) => offer.type === pointType);

  return  filteredOffers ? filteredOffers.offers : [];
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

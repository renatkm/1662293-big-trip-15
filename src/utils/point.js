import {OFFERS} from '../const.js';

export const getOfferListByPointType = (pointType) =>  {
  const filteredOffers = OFFERS.find((offer) => offer.type === pointType);

  return  filteredOffers ? filteredOffers.offers : null;
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

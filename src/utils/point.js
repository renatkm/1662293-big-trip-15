import {OFFERS} from '../const.js';

export const getOfferListByPointType = (pointType) =>  {
  const filteredOffers = OFFERS.find((offer) => offer.type === pointType);

  return  filteredOffers ? filteredOffers.offers : null;
};

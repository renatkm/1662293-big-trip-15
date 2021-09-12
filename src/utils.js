import dayjs from 'dayjs';
import { OfferList } from './const.js';

export const getRandomInteger = (a = 0, b = 1) =>{
  const lBound = Math.ceil(Math.min(a, b));
  const uBound = Math.floor(Math.max(a, b));

  return Math.floor(lBound+ Math.random()*(uBound - lBound+1));
};

export const getRandomItem = (collection) => collection[getRandomInteger(0, collection.length-1)];
export const getOfferListByEventType = (eventType) => eventType === ''? OfferList: OfferList.filter((offer) => offer.EventType===eventType || offer.EventType==='Any');
export const getTimePart = (datetime) => dayjs(datetime).format('HH:mm');
export const getDatePart = (datetime) => dayjs(datetime).format('YYYY-MM-DD');
export const getHumanizedDate = (datetime) => dayjs(getDatePart(datetime)).format('MMM-DD');

export const getDiffTime = (datetime1, datetime2) =>{
  let diff = dayjs(datetime1).diff(dayjs(datetime2), 'minute');
  const days = Math.floor(diff/1440);
  diff = diff % 1440;
  const hours = Math.floor(diff/60);
  const minutes = (diff % 60);
  return  `${days > 0? `${days }D `:''}${hours > 0? `${hours}H `:''}${minutes > 0? `${minutes}M`:''}`.trim();
};

import dayjs from 'dayjs';

const NUMBER_MIN_PER_DAY = 1440;
const NUMBER_MIN_PER_HOUR = 60;

const getTwoDigitsString = (number) => number.toString().padStart(2, '0');

export const getRandomInteger = (a = 0, b = 1) => {
  const lBound = Math.ceil(Math.min(a, b));
  const uBound = Math.floor(Math.max(a, b));

  return Math.floor(lBound+ Math.random()*(uBound - lBound+1));
};

export const getRandomItem = (collection) => collection[getRandomInteger(0, collection.length-1)];

export const getTimePart = (datetime) => dayjs(datetime).format('HH:mm');

export const getDatePart = (datetime) => dayjs(datetime).format('YYYY-MM-DD');

export const getHumanizedDate = (datetime) => dayjs(getDatePart(datetime)).format('MMM DD');

export const getHumanizedDateTime = (datetime) => dayjs(datetime).format('DD/MM/YY HH:mm');

export const getDurationTime = (duration) => {
  // duration in ms, convert it to minutes
  const totalMinutes = Math.round(duration/(1000*60));
  const days = Math.floor(totalMinutes/NUMBER_MIN_PER_DAY);
  const hours = Math.floor(totalMinutes/NUMBER_MIN_PER_HOUR);
  const minutes = (totalMinutes % NUMBER_MIN_PER_HOUR);

  if (days > 0) {
    return `${getTwoDigitsString(days)}D ${getTwoDigitsString(hours)}H ${getTwoDigitsString(minutes)}M`;
  }

  if (days === 0 & hours > 0) {
    return `${getTwoDigitsString(hours)}H ${getTwoDigitsString(minutes)}M`;
  }

  return `${getTwoDigitsString(minutes)}M`;
};

export const getHumanizedDiffTime = (datetime1, datetime2) => getDurationTime(dayjs(datetime1).diff(dayjs(datetime2)));

export const getCapitalizedFirstLetterText = (string) => string
  .split(/\s+/)
  .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
  .join(' ');

export const getLowerCaseText = (offerName) => offerName.replace(/\s+/gm, '-').toLowerCase();

export const makeSetUniqueElements = (items) => [...new Set(items)];

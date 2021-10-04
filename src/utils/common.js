import dayjs from 'dayjs';

const MinutesPeriod = {
  PER_DAY: 1440,
  PER_HOUR: 60,
};

const getTwoDigitsString = (number) => number.toString().padStart(2, '0');

export const getTimePart = (datetime) => dayjs(datetime).format('HH:mm');

export const getDatePart = (datetime) => dayjs(datetime).format('YYYY-MM-DD');

export const getHumanizedDate = (datetime) => dayjs(getDatePart(datetime)).format('MMM DD');

export const getHumanizedDateTime = (datetime) => dayjs(datetime).format('DD/MM/YY HH:mm');

export const getDurationTime = (duration) => {
  // duration in ms, convert it to minutes
  const totalMinutes = Math.round(duration/(1000*60));
  const days = Math.floor(totalMinutes/MinutesPeriod.PER_DAY);
  const hours = Math.floor(totalMinutes/MinutesPeriod.PER_HOUR);
  const minutes = (totalMinutes % MinutesPeriod.PER_HOUR);

  if (days > 0) {
    return `${getTwoDigitsString(days)}D ${getTwoDigitsString(hours)}H ${getTwoDigitsString(minutes)}M`;
  }

  if (days === 0 & hours > 0) {
    return `${getTwoDigitsString(hours)}H ${getTwoDigitsString(minutes)}M`;
  }

  return `${getTwoDigitsString(minutes)}M`;
};

export const getDiffTime = (dateA, dateB) => {
  const now = dayjs();
  const date2 =  dateB ? dayjs(dateB) : now;
  const date1 = dateA ? dayjs(dateA) : now;

  return date2.diff(date1);
};

export const getHumanizedDiffTime = (dateA, dateB) => getDurationTime(dayjs(dateA).diff(dayjs(dateB)));

export const getCapitalizedFirstLetterText = (string) => string
  .split(/\s+/)
  .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
  .join(' ');

export const getLowerCaseText = (offerName) => offerName.replace(/\s+/gm, '-').toLowerCase();

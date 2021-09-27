
import {FilterType} from '../const.js';
import {isFuturePoint, isPastPoint} from './point.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point.arrivalTime)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point.departureTime)),
};

import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

export const EMPTY_POINT = {
  id: nanoid(),
  destination: {
    name: 'Geneva',
    description: '',
    pictures: [],
  },
  type: 'Restaurant',
  arrivalTime: dayjs().startOf('day').add(1, 'day').toDate(),
  departureTime: dayjs().startOf('day').add(2, 'day').toDate(),
  basePrice: null,
  isFavorite: false,
  offers: [],
};

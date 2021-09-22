
export const OFFERS = [
  {
    type: 'Check-in',
    offers: [
      {
        name: 'Add breakfast',
        cost : 10,
      },
      {
        name: 'Late check-in',
        cost : 10,
      },
    ]},
  {
    type: 'Sightseeing',
    offers: [
      {
        name: 'Book tickets',
        cost : 10,
      },
      {
        name: 'Lunch in city',
        cost: 60,
      },
      {
        name: 'Order Uber',
        cost: 20,
      },
    ]},
  {
    type: 'Taxi',
    offers: [
      {
        name: 'Switch Radio Station',
        cost :60,
      },
      {
        name: 'Add luggage',
        cost: 10,
      },
    ]},
  {
    type: 'Flight',
    offers: [
      {
        name: 'Rent a car',
        cost: 100,
      },
      {
        name: 'Add luggage',
        cost: 50,
      },
      {
        name: 'Choose a meal',
        cost: 20,
      },
      {
        name: 'Switch to comfort',
        cost: 80,
      },
      {
        name: 'Choose seats',
        cost: 5,
      },
      {
        name: 'Travel by train',
        cost: 40,
      },
    ]},
  {
    type: 'Ship',
    offers: [
      {
        name: 'Add luggage',
        cost: 20,
      },
      {
        name: 'Choose a meal',
        cost: 10,
      },
      {
        name: 'Switch to comfort',
        cost: 40,
      },
    ]},
  {
    type: 'Bus',
    offers: [
      {
        name: 'Add luggage',
        cost: 10,
      },
      {
        name: 'Choose seats',
        cost: 5,
      },
    ]},
  {
    type: 'Train',
    offers: [
      {
        name: 'Choose a meal',
        cost: 10,
      },
      {
        name: 'Switch to comfort',
        cost: 60,
      },
      {
        name: 'Choose seats',
        cost: 5,
      },
    ]},
];

export const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

export const DESTINATIONS = ['Geneva', 'Amsterdam', 'Paris', 'Berlin', 'Madrid'];

export const SortTypes = {
  DAY: {
    name: 'day',
    disabled: false,
  },
  EVENT: {
    name: 'event',
    disabled: true,
  },
  TIME: {
    name: 'time',
    disabled: false,
  },
  PRICE: {
    name: 'price',
    disabled: false,
  },
  OFFERS: {
    name: 'offers',
    disabled: true,
  },
};

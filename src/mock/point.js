import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) =>{
  const lBound = Math.ceil(Math.min(a, b));
  const uBound = Math.floor(Math.max(a, b));

  return Math.floor(lBound+ Math.random()*(uBound - lBound+1));
};

const generateDescription = () => {
  const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

  const sentenses = Array.from(TEXT.split('.'));
  const n = getRandomInteger(1,5);
  return `${new Array(n).fill().map(() => sentenses[getRandomInteger(0, sentenses.length-1)]).join('.').trimLeft()  }.`;
};

const PointTypes = [
  'Taxi',
  'Bus',
  'Train',
  'Transport',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const Destinations = [
  'Geneva',
  'Amsterdam',
  'Paris',
  'Berlin',
  'Madrid',
];

const getRandomItem = (collection) => collection[getRandomInteger(0, collection.length-1)];

const getRandomEventType= () =>getRandomItem(PointTypes);

const getRandomDestination= () =>getRandomItem(Destinations);


const generateArrivalTime = (startTime) => {
  if (!startTime){
    startTime = dayjs();
    startTime = startTime.add(15- (startTime.minute() % 15), 'minutes');
  }

  const intervals30m = getRandomInteger(1, 96)*15;
  return startTime.add(intervals30m, 'minutes');
};

const Offers = [
  {Name: 'Add breakfast', Cost : 10},
  {Name: 'Order Uber', Cost : 20},
  {Name: 'Swith Radio Station', Cost :60},
  {Name: 'Late check-in', Cost: 40},
  {Name: 'Rent a car', Cost: 200},
  {Name: 'Add luggage', Cost: 50},
  {Name: 'Choose a meal', Cost: 20},
  {Name: 'Upgrage to comfort', Cost: 80},
];

const getAnyOffers = () =>{
  const maxNumberOfOffers = Offers.length;
  const numberOfOffers = getRandomInteger(0, maxNumberOfOffers-1);

  if (numberOfOffers===0){
    return null;
  }

  const offers = new Set();
  offers.add(getRandomItem(Offers));

  while (offers.size < numberOfOffers) {
    offers.add(getRandomItem(Offers));
  }

  return Array.from(offers);
};

export const  generatePoint = (prevPoint) => {
  const {Destination, DepartureTime} = !prevPoint ?
    {
      Destination : getRandomDestination(),
      DepartureTime: null,
    }
    : prevPoint;

  const arrivalTime = generateArrivalTime(DepartureTime);
  const departureTime = generateArrivalTime(arrivalTime);
  const eventType = getRandomEventType();
  return {
    Name : eventType,
    Origin: Destination,
    Destination: getRandomDestination(),
    EventType : eventType,
    ArrivalTime : arrivalTime,
    DepartureTime : departureTime,
    Description: generateDescription(),
    Cost: getRandomInteger(0, 300),
    IsFavorite: false,
    Offers: getAnyOffers(),
  };
};

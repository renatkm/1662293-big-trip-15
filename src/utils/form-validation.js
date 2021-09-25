import he from 'he';
import {getDestinationOrDefault} from '../utils/point.js';

const destinationValidation = (evt) => {
  const destinationControl = evt.target.querySelector('.event__input--destination');

  if (!getDestinationOrDefault(he.encode(destinationControl.value), false)){
    destinationControl.setCustomValidity(`Sorry, there is no information about ${destinationControl.value}`);
  }
  else {
    destinationControl.setCustomValidity('');
  }

  destinationControl.reportValidity();
};

const basePriceValidation = (evt) => {
  const baePriceControl = evt.target.querySelector('.event__input--price');

  if (!baePriceControl.value) {
    baePriceControl.setCustomValidity('Please specify the base price of the trip');
  } else {
    baePriceControl.setCustomValidity('');
  }

  baePriceControl.reportValidity();
};

export const formValidation = (evt) => {
  destinationValidation(evt);
  basePriceValidation(evt);
};

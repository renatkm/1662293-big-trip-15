const validateDestination = (evt) => {
  const destinationElement = evt.target.querySelector('.event__input--destination');

  let destinationFound = false;

  for (const option of destinationElement.list.options) {
    if (destinationElement.value === option.value) {
      destinationFound = true;
      break;
    }
  }

  if (!destinationFound) {
    destinationElement.setCustomValidity(`Sorry, there is no information about ${destinationElement.value}`);
  }
  else {
    destinationElement.setCustomValidity('');
  }

  destinationElement.reportValidity();
};

const validateBasePrice = (evt) => {
  const baePriceElement = evt.target.querySelector('.event__input--price');

  if (!baePriceElement.value) {
    baePriceElement.setCustomValidity('Please specify the base price of the trip');
  } else {
    baePriceElement.setCustomValidity('');
  }

  baePriceElement.reportValidity();
};

const validateDates = (evt) => {
  const startTimeElement = evt.target.querySelector('[name=event-start-time]');
  const endTimeElement = evt.target.querySelector('[name=event-end-time]');

  if (startTimeElement.value > endTimeElement.value) {
    endTimeElement.setCustomValidity('The start of the event can\'t be later then the end of event.');
  } else {
    endTimeElement.setCustomValidity('');
  }

  endTimeElement.reportValidity();
};

const validateForm = (evt) => {
  validateDestination(evt);
  validateBasePrice(evt);
  validateDates(evt);
};

export {validateForm};

const destinationValidation = (evt) => {
  const destinationControl = evt.target.querySelector('.event__input--destination');

  let destinationFound = false;
  const datalist = destinationControl.list;

  for (let j = 0; j < datalist.options.length; j++) {
    if (destinationControl.value === datalist.options[j].value) {
      destinationFound = true;
      break;
    }
  }

  if (!destinationFound){
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

const pointDatesValidation = (evt) => {
  const startTimeElement = evt.target.querySelector('[name=event-start-time]');
  const endTimeElement = evt.target.querySelector('[name=event-end-time]');

  if (startTimeElement.value > endTimeElement.value) {
    endTimeElement.setCustomValidity('The start of the event can\'t be later then the end of event.');
  } else {
    endTimeElement.setCustomValidity('');
  }

  endTimeElement.reportValidity();
};

export const formValidation = (evt) => {
  destinationValidation(evt);
  basePriceValidation(evt);
  pointDatesValidation(evt);
};

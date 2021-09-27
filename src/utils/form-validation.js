const destinationValidation = (evt) => {
  const destinationControl = evt.target.querySelector('.event__input--destination');

  let destinationFound = false;
  const datalist = evt.target.list;
  console.log('datalist', datalist);
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

export const formValidation = (evt) => {
  destinationValidation(evt);
  basePriceValidation(evt);
};

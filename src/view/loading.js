import Abstract from './abstract';

const createLoadingTemplate = () => (
  '<p class="trip-events__msg">Loading...</p>'
);

class Loading extends Abstract {
  getTemplate() {
    return createLoadingTemplate();
  }
}

export default Loading;

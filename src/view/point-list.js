import AbstractView from './abstract.js';

const createListTemplate = () => '<ul class="trip-events__list"></ul>';

class PointList extends AbstractView {
  getTemplate() {
    return createListTemplate();
  }
}

export default PointList;

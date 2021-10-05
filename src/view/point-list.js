import AbstractView from './abstract.js';

const createListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class PointList extends AbstractView {
  getTemplate() {
    return createListTemplate();
  }
}


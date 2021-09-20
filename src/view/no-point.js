import AbstractView from './abstract.js';

const createEmptyTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class NoPoint extends AbstractView {
  getTemplate() {
    return createEmptyTemplate();
  }
}

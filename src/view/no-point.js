import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click «New Event» to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createEmptyTemplate = (filterType) => `<p class="trip-events__msg">${NoTasksTextType[filterType]}</p>`;

export default class NoPoint extends AbstractView {
  constructor(filterType) {
    super();
    this._filterType = filterType;
  }

  getTemplate() {
    return createEmptyTemplate(this._filterType);
  }
}

import {createMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createTripInfoTemplate} from './view/tripInfo.js';
import {createTripSummaryTemplate} from './view/tripSummary.js';
import {createTripCostTemplate} from './view/tripCost.js';
import {createSortingTemplate} from './view/sorting.js';
import {createListTemplate} from './view/point-list.js';
import {createPointEditTemplate} from './view/point-edit.js';
import {createPointTemplate} from './view/point.js';
import {generatePoint} from './mock/point.js';

const render = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};

const siteTripMainElement  = document.querySelector('.trip-main');
const siteMenuElement = document.querySelector('.trip-main__trip-controls');
const siteHeaderElement = siteMenuElement.querySelector('.trip-controls__navigation');
const filterElement = siteMenuElement.querySelector('.trip-controls__filters');
const pointListElement = document.querySelector('.trip-events');

const TRIP_POINTS_COUNT = 15;

const points = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);

render(siteTripMainElement, createTripInfoTemplate(), 'afterbegin');

const tripInfoElement = siteTripMainElement.querySelector('.trip-info');
render(tripInfoElement, createTripSummaryTemplate(), 'afterbegin');
render(tripInfoElement, createTripCostTemplate(), 'beforeend');

render(siteHeaderElement, createMenuTemplate(), 'beforeend');
render(filterElement, createFilterTemplate(), 'beforeend');

render(pointListElement, createSortingTemplate(), 'beforeend');
render(pointListElement, createListTemplate(), 'beforeend');

const tripPointsListElement = pointListElement.querySelector('.trip-events__list');
render(tripPointsListElement, createPointEditTemplate(points[0]), 'beforeend');

for (let i = 1; i < TRIP_POINTS_COUNT; i++) {
  render(tripPointsListElement, createPointTemplate(points[i]), 'beforeend');
}

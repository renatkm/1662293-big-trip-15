import {createNavigationComponent} from './view/navigationComponent.js';
import {createFilterComponent} from './view/filterComponent.js';
import {createInfoSummaryComponent} from './view/infoSummaryComponent.js';
import {createInfoCostComponent} from './view/infoCostComponent.js';
import {createSortingPointsComponent} from './view/sortingPointsComponent.js';
import {createListPointsComponent} from './view/listPointsComponent.js';
import {createEditPointComponent} from './view/editPoint.js';
import {createPointComponent} from './view/point.js';
import {generatePoint} from './mock/point.js';

const render = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};


// Секция даты поездки и стоимости
const siteTripMainElement  = document.querySelector('.trip-main');
render(siteTripMainElement, createInfoSummaryComponent(), 'afterbegin');

const siteTripSummaryElement = siteTripMainElement.querySelector('.trip-main__trip-info');
render(siteTripSummaryElement, createInfoCostComponent(), 'beforeend');

// Меню и фильтры
const siteMenuElement = document.querySelector('.trip-main__trip-controls');
const siteHeaderElement = siteMenuElement.querySelector('.trip-controls__navigation');
render(siteHeaderElement, createNavigationComponent(), 'beforeend');

const siteFilterElement = siteMenuElement.querySelector('.trip-controls__filters');
render(siteFilterElement, createFilterComponent(), 'beforeend');

const NUMBER_ENDPOINTS =3;

const points = new Array(NUMBER_ENDPOINTS).fill();
for (let index = 0; index < points.length; index++) {
  points[index] = index === 0 ? generatePoint(): generatePoint(points[index-1]);
}

const tripEventsElement = document.querySelector('.trip-events');
render(tripEventsElement, createSortingPointsComponent(), 'beforeend');
render(tripEventsElement, createListPointsComponent(), 'beforeend');

const siteTripElement = tripEventsElement.querySelector('.trip-events__list');
render(siteTripElement, createEditPointComponent(), 'afterbegin');

for (const point of points) {
  render(siteTripElement, createPointComponent(point), 'beforeend');
}

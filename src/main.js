import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import RoutePresenter from './presenter/route.js';
import {generatePoint} from './mock/point.js';
import {getRandomInteger} from './utils/common.js';
import {render, RenderPosition} from './utils/render.js';

const siteMenuElement = document.querySelector('.trip-main__trip-controls');
const siteHeaderElement = siteMenuElement.querySelector('.trip-controls__navigation');
const filterElement = siteMenuElement.querySelector('.trip-controls__filters');
const tripElement = document.querySelector('main > div.page-body__container');
const routePresenter = new RoutePresenter(tripElement);

const TRIP_POINTS_COUNT = getRandomInteger(0, 15);

const points = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(filterElement, new FilterView(), RenderPosition.BEFOREEND);

routePresenter.init(points);

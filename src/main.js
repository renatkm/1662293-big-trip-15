import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import RoutePresenter from './presenter/route.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/Points.js';
import FilterModel from './model/filter.js';
import {generatePoint} from './mock/point.js';
import {getRandomInteger} from './utils/common.js';
import {render, RenderPosition} from './utils/render.js';

const siteMenuElement = document.querySelector('.trip-main__trip-controls');
const siteHeaderElement = siteMenuElement.querySelector('.trip-controls__navigation');
const filterElement = siteMenuElement.querySelector('.trip-controls__filters');
const tripElement = document.querySelector('.page-main > .page-body__container');


const TRIP_POINTS_COUNT = getRandomInteger(0, 15);

const points = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);

const pointModel = new PointsModel();
pointModel.setPoints(points);

const filterModel = new FilterModel();

const routePresenter = new RoutePresenter(tripElement, pointModel, filterModel);
const filterPresenter = new FilterPresenter(filterElement, filterModel, pointModel);
render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);

routePresenter.init();
filterPresenter.init();

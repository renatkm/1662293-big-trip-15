import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import TripInfoView from './view/tripInfo.js';
import TripSummaryView from './view/tripSummary.js';
import TripCostView from './view/tripCost.js';
import SortView from './view/sorting.js';
import PointListView from './view/point-list.js';
import PointEditView from './view/point-edit.js';
import PointView from './view/point.js';
import {generatePoint} from './mock/point.js';
import {render, RenderPosition} from './utils.js';

const siteTripMainElement  = document.querySelector('.trip-main');
const siteMenuElement = document.querySelector('.trip-main__trip-controls');
const siteHeaderElement = siteMenuElement.querySelector('.trip-controls__navigation');
const filterElement = siteMenuElement.querySelector('.trip-controls__filters');
const pointListElement = document.querySelector('.trip-events');

const TRIP_POINTS_COUNT = 15;

const points = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);

const tripInfoView = new TripInfoView();
render(siteTripMainElement, tripInfoView.getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoView.getElement(), new TripSummaryView().getElement(), RenderPosition.AFTERBEGIN);
render(tripInfoView.getElement(), new TripCostView().getElement(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(filterElement, new FilterView().getElement(), RenderPosition.BEFOREEND);
render(pointListElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const pointListView = new PointListView();
render(pointListElement,  pointListView.getElement(), RenderPosition.BEFOREEND);
render(pointListView.getElement(), new PointEditView(points[0]).getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < TRIP_POINTS_COUNT; i++) {
  render(pointListView.getElement(), new PointView(points[i]).getElement(), RenderPosition.BEFOREEND);
}

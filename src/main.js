import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import TripInfoView from './view/tripInfo.js';
import TripSummaryView from './view/tripSummary.js';
import TripCostView from './view/tripCost.js';
import SortView from './view/sorting.js';
import PointListView from './view/point-list.js';
import NoPointView from './view/no-point.js';
import PointEditView from './view/point-edit.js';
import PointView from './view/point.js';
import {generatePoint} from './mock/point.js';
import {getRandomInteger} from './utils/common.js';
import {render, RenderPosition, replace} from './utils/render.js';

const siteTripMainElement  = document.querySelector('.trip-main');
const siteMenuElement = document.querySelector('.trip-main__trip-controls');
const siteHeaderElement = siteMenuElement.querySelector('.trip-controls__navigation');
const filterElement = siteMenuElement.querySelector('.trip-controls__filters');
const pointListElement = document.querySelector('.trip-events');

const TRIP_POINTS_COUNT = getRandomInteger(0, 15);

const points = new Array(TRIP_POINTS_COUNT).fill().map(generatePoint);

const renderPoint = (locationElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new PointEditView(point);

  const replaceViewToEdit = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceEditToView = () => {
    replace(pointComponent, pointEditComponent);
  };

  const keydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditToView();
      document.removeEventListener('keydown', keydownHandler);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replaceViewToEdit();
    document.addEventListener('keydown', keydownHandler);
  });

  pointEditComponent.setFormSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToView();
    document.removeEventListener('keydown', keydownHandler);
  });

  pointEditComponent.setEditClickHandler(() => {
    replaceEditToView();
    document.removeEventListener('keydown', keydownHandler);
  });

  render(locationElement, pointComponent, RenderPosition.BEFOREEND);
};

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(filterElement, new FilterView(), RenderPosition.BEFOREEND);

if (!points.length) {
  render(pointListElement, new NoPointView(), RenderPosition.BEFOREEND);
}
else{
  const tripInfoView = new TripInfoView();

  render(siteTripMainElement, tripInfoView, RenderPosition.AFTERBEGIN);
  render(tripInfoView, new TripSummaryView(), RenderPosition.AFTERBEGIN);
  render(tripInfoView, new TripCostView(), RenderPosition.BEFOREEND);
  render(pointListElement, new SortView(), RenderPosition.BEFOREEND);

  const pointListView = new PointListView();
  render(pointListElement,  pointListView, RenderPosition.BEFOREEND);

  for (let i = 0; i < points.length; i++) {
    renderPoint(pointListView, points[i]);
  }
}

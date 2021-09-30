import SiteMenuView from './view/site-menu.js';
import StatsView from './view/stats.js';
import RoutePresenter from './presenter/route.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FiltersModel from './model/filters.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations.js';
import {UpdateType, MenuItem} from './const.js';
import {render, RenderPosition, remove} from './utils/render.js';
import Api from './api.js';

const siteMenuElement = document.querySelector('.trip-main__trip-controls');
const siteHeaderElement = siteMenuElement.querySelector('.trip-controls__navigation');
const filterElement = siteMenuElement.querySelector('.trip-controls__filters');
const tripElement = document.querySelector('.page-main > .page-body__container');
const newPointButtonElement = document.querySelector('.trip-main__event-add-btn');
const siteMainElement = document.querySelector('main.page-body__page-main .page-body__container');

newPointButtonElement.disabled = true;
const onClosePointNewFormCallback = () => {
  newPointButtonElement.disabled = false;
};

const AUTHORIZATION = 'Basic cmVuYXQ6a3V0bGl5YXJvdg==';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

Promise.all([
  api.getDestinations(),
  api.getOffers(),
  api.getPoints(),
])
  .then((values) => {
    const [destinations, offers, points] = values;
    destinationsModel.setDestinations(UpdateType.INIT, destinations);
    offersModel.setOffers(UpdateType.INIT, offers);
    pointsModel.setPoints(UpdateType.INIT, points);
    newPointButtonElement.disabled = false;
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });

const siteMenuComponent = new SiteMenuView();
render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);

const routePresenter = new RoutePresenter(tripElement, pointsModel, filtersModel, offersModel, destinationsModel, api);
const filterPresenter = new FilterPresenter(filterElement, filtersModel, pointsModel);

let statsComponent = null;

const handleSiteMenuClick = (menuElement) => {
  routePresenter.delete();
  siteMenuComponent.setMenuItem(menuElement);

  switch (menuElement.text) {
    case MenuItem.TABLE:
      remove(statsComponent);
      routePresenter.init();
      newPointButtonElement.disabled = false;
      filterPresenter.init();
      break;

    case MenuItem.STATS:
      routePresenter.delete();
      newPointButtonElement.disabled = true;
      document.querySelectorAll('.trip-filters__filter-input').forEach((filter) => filter.disabled = true);
      statsComponent = new StatsView(pointsModel.getPoints());
      render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

routePresenter.init();
filterPresenter.init();

newPointButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  newPointButtonElement.disabled = true;
  routePresenter.createPoint(onClosePointNewFormCallback);
});

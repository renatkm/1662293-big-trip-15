import SiteMenuView from './view/site-menu.js';
import RoutePresenter from './presenter/route.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';
import DestinationsModel from './model/destinations';
import {UpdateType} from './const.js';
import {render, RenderPosition} from './utils/render.js';
import Api from './api.js';

const siteMenuElement = document.querySelector('.trip-main__trip-controls');
const siteHeaderElement = siteMenuElement.querySelector('.trip-controls__navigation');
const filterElement = siteMenuElement.querySelector('.trip-controls__filters');
const tripElement = document.querySelector('.page-main > .page-body__container');
const newPointButtonElement = document.querySelector('.trip-main__event-add-btn');

const onClosePointNewFormCallback = () => {
  newPointButtonElement.disabled = false;
};

const AUTHORIZATION = 'Basic cmVuYXQ6a3V0bGl5YXJvdg==';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const routePresenter = new RoutePresenter(tripElement, pointsModel, filterModel, offersModel, destinationsModel);
const filterPresenter = new FilterPresenter(filterElement, filterModel, pointsModel);
render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);

routePresenter.init();
filterPresenter.init();

newPointButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  newPointButtonElement.disabled = true;
  routePresenter.createPoint(onClosePointNewFormCallback);
});

Promise.all([
  api.getPoints(),
  api.getOffers(),
  api.getDestinations(),
])
  .then((values) => {
    const [pointList, offerList, destinationList] = values;
    pointsModel.setPoints(UpdateType.INIT, pointList);
    offersModel.setOffers(UpdateType.INIT, offerList);
    destinationsModel.setDestinations(UpdateType.INIT, destinationList);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
  });

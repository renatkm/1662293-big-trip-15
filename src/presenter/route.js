import RouteView from '../view/route.js';
import NoPointView from '../view/no-point.js';
import PointListView from '../view/point-list.js';
import PointPresenter from './point.js';
import SortView from '../view/sorting.js';
import TripInfoView from '../view/tripInfo.js';
import TripCostView from '../view/tripCost.js';
import TripSummaryView from '../view/tripSummary.js';
import {render, RenderPosition} from '../utils/render.js';

export default class Route {
  constructor(routeContainer) {
    //Инициализация контейнера
    this._routeContainer = routeContainer;
    this._routeComponent = new RouteView();
    this._sortComponent = new SortView();
    this._pointsComponent = new PointListView();
    this._noPointComponent = new NoPointView();
    this._tripInfoComponent = new TripInfoView();
    this._tripCostComponent = new TripCostView();
    this._tripSummaryComponent = new TripSummaryView();

    render(this._routeContainer, this._routeComponent, RenderPosition.BEFOREEND);
    render(this._routeComponent, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._routeComponent, this._pointsComponent, RenderPosition.BEFOREEND);
  }

  init(points) {
    // Инициализация точками маршрута
    this._points = points.slice();
    this._renderRoute();
  }

  _renderRoute() {
    if (!this._points.length) {
      this._renderNoPoints();
    }
    else{
      this._renderInfo();
      this._renderSort();
      this._renderPoints();
    }
  }

  _renderInfo() {
    // Отрисовка информации по маршруту -откуда куда, когда и общая стоимость
    const siteTripMainElement  = document.querySelector('.trip-main');

    render(siteTripMainElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripSummaryComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripCostComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    // Сортировка точек маршрута
    render(this._routeComponent, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    //Создание и редактирование точки маршрута.
    const pointPresenter = new PointPresenter(this._pointsComponent);

    pointPresenter.init(point);
  }

  _renderPoints() {
    // отрисовка всех точек маршрута.
    render(this._routeComponent,  this._pointsComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < this._points.length; i++) {
      this._renderPoint(this._points[i]);
    }
  }

  _renderNoPoints() {
    // Отрисовка заглушки
    render(this._routeComponent, this._noPointComponent, RenderPosition.BEFOREEND);
  }
}

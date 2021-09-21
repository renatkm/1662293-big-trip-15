import RouteView from '../view/route.js';
import NoPointView from '../view/no-point.js';
import PointListView from '../view/point-list.js';
import PointPresenter from './point.js';
import SortView from '../view/sorting.js';
import TripInfoView from '../view/tripInfo.js';
import TripCostView from '../view/tripCost.js';
import TripSummaryView from '../view/tripSummary.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {comparePointDate, comparePointLength, comparePointCost, updatePoints} from '../utils/point.js';
import {SortType} from '../const.js';

export default class Route {
  constructor(routeContainer) {
    //Инициализация контейнера
    this._routeContainer = routeContainer;
    this._pointCollection = new Map();
    this._currentSortType = SortType.DAY.name;

    this._routeComponent = new RouteView();
    this._sortComponent = new SortView();
    this._pointsComponent = new PointListView();
    this._noPointComponent = new NoPointView();
    this._tripInfoComponent = new TripInfoView();
    this._tripCostComponent = new TripCostView();
    this._tripSummaryComponent = new TripSummaryView();

    this._handlePointUpdate = this._handlePointUpdate.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    // Инициализация точками маршрута
    this._points = points.slice();
    this._sourcedTripPoints = points.slice();
    this._renderRoute();
  }

  _renderRoute() {
    render(this._routeContainer, this._routeComponent, RenderPosition.BEFOREEND);
    render(this._routeComponent, this._sortComponent, RenderPosition.BEFOREEND);
    render(this._routeComponent, this._pointsComponent, RenderPosition.BEFOREEND);

    if (!this._points.length) {
      this._renderNoPoints();
      return;
    }

    this._renderInfo();
    this._renderSort(this._currentSortType);
    this._renderPoints();
  }

  _handlePointUpdate(updatedPoint) {
    this._points = updatePoints(this._points, updatedPoint);
    this._sourcedTripPoints = updatePoints(this._sourcedTripPoints, updatedPoint);
    this._pointCollection.get(updatedPoint.id).init(updatedPoint);
  }

  _handleModeChange() {
    this._pointCollection.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if(this._currentSortType === sortType) {
      return;
    }
    this._sortPoints(sortType);
    this._renderSort(this._currentSortType);
    this._clearPointList();
    this._renderPoints();
  }

  _sortPoints(sortType) {
    switch(sortType) {
      case SortType.PRICE.name:
        this._points.sort(comparePointCost);
        break;
      case SortType.TIME.name:
        this._points.sort(comparePointLength);
        break;
      default:
        this._points = this._points.sort(comparePointDate);
    }

    this._currentSortType = sortType;
  }

  _renderInfo() {
    // Отрисовка информации по маршруту -откуда куда, когда и общая стоимость
    const siteTripMainElement  = document.querySelector('.trip-main');

    render(siteTripMainElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripSummaryComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripCostComponent, RenderPosition.BEFOREEND);
  }

  _renderSort(sortType) {
    // Сортировка точек маршрута
    const prevSortComponent = this._sortComponent;

    this._sortComponent = new SortView(sortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    if (prevSortComponent === null) {
      render(this._routeContainer, this._sortComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._routeContainer.contains(prevSortComponent.getElement())) {
      replace(this._sortComponent, prevSortComponent);
    }

    remove(prevSortComponent);
  }

  _renderPoint(point) {
    //Создание и редактирование точки маршрута.
    const pointPresenter = new PointPresenter(this._pointsComponent, this._handlePointUpdate, this._handleModeChange);
    pointPresenter.init(point);
    this._pointCollection.set(point.id, pointPresenter);
  }

  _renderPoints() {
    // отрисовка всех точек маршрута.
    render(this._routeComponent,  this._pointsComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < this._points.length; i++) {
      this._renderPoint(this._points[i]);
    }
  }

  _clearPointList() {
    this._pointCollection.forEach((presenter) => presenter.delete());
    this._pointCollection.clear();
  }

  _renderNoPoints() {
    // Отрисовка заглушки
    render(this._routeComponent, this._noPointComponent, RenderPosition.BEFOREEND);
  }
}

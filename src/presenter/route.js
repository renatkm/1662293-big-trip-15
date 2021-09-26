import RouteView from '../view/route.js';
import NoPointView from '../view/no-point.js';
import PointListView from '../view/point-list.js';
import PointPresenter from './point.js';
import PointNewPresenter from './point-new.js';
import SortingView from '../view/sorting.js';
import TripInfoView from '../view/tripInfo.js';
import TripCostView from '../view/tripCost.js';
import TripSummaryView from '../view/tripSummary.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import {comparePointDate, comparePointLength, comparePointBasePrice} from '../utils/point.js';
import {SortTypes, UpdateType, UserAction, FilterType} from '../const.js';

export default class Route {
  constructor(routeContainer, pointsModel, filterModel, offersModel, destinationsModel) {
    //Инициализация контейнера
    this._routeContainer = routeContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._pointCollection = new Map();
    this._currentSortType = SortTypes.DAY.name;
    this._filterType = FilterType.EVERYTHING;

    this._routeComponent = new RouteView();
    this._sortComponent = null;
    this._noPointComponent = null;

    this._pointsComponent = new PointListView();
    this._tripInfoComponent = new TripInfoView();
    this._tripCostComponent = new TripCostView();
    this._tripSummaryComponent = new TripSummaryView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pointNewPresenter = new PointNewPresenter(this._pointsComponent, this._handleViewAction);
  }

  init() {
    // Инициализация точками маршрута
    this._renderRoute();
  }

  createPoint(onCloseCallback) {
    this._currentSortType = SortTypes.DAY.name;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init(onCloseCallback);
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[this._filterType](points);

    switch(this._currentSortType) {
      case SortTypes.PRICE.name:
        return filteredPoints.sort(comparePointBasePrice);
      case SortTypes.TIME.name:
        return filteredPoints.sort(comparePointLength);
    }

    return filteredPoints.sort(comparePointDate);
  }

  _handleViewAction(actionType, updateType, update) {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch(updateType) {
      case UpdateType.PATCH:
        this._pointCollection.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearRoute();
        this._renderRoute();
        //обновить часть проекта
        break;
      case UpdateType.MAJOR:
        //обновить проект полностью
        this._clearRoute(true);
        this._renderRoute();
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.delete();
    this._pointCollection.forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if(this._currentSortType === sortType) {
      return;
    }

    remove(this._sortComponent);
    this._currentSortType = sortType;
    this._renderSort();
    this._clearPointList();
    this._renderPoints(this._getPoints());
  }

  _clearRoute(resetSortType = false){
    this._pointNewPresenter.delete();
    this._pointCollection.forEach((presenter) => presenter.delete());
    this._pointCollection.clear();

    remove(this._sortComponent);
    remove(this._noPointComponent);

    if (resetSortType){
      this._currentSortType = SortTypes.DAY;
    }
  }

  _renderRoute() {
    render(this._routeContainer, this._routeComponent, RenderPosition.BEFOREEND);
    render(this._routeComponent, this._pointsComponent, RenderPosition.BEFOREEND);
    const points = this._getPoints();
    const pointsNumber = points.length;

    if (!pointsNumber) {
      this._renderNoPoints();
      return;
    }

    this._renderInfo();
    this._renderSort();
    this._renderPoints(points.slice());
  }

  _renderInfo() {
    // Отрисовка информации по маршруту -откуда куда, когда и общая стоимость
    const siteTripMainElement  = document.querySelector('.trip-main');

    render(siteTripMainElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripSummaryComponent, RenderPosition.AFTERBEGIN);
    render(this._tripInfoComponent, this._tripCostComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortingView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._routeComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    //Создание и редактирование точки маршрута.
    const pointPresenter = new PointPresenter(this._pointsComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointCollection.set(point.id, pointPresenter);
  }

  _renderPoints(points) {
    // отрисовка всех точек маршрута.
    render(this._routeComponent,  this._pointsComponent, RenderPosition.BEFOREEND);

    points.forEach((point) =>  this._renderPoint(point));
  }

  _clearPointList() {
    this._pointCollection.forEach((presenter) => presenter.delete());
    this._pointCollection.clear();
  }

  _renderNoPoints() {
    // Отрисовка заглушки
    this._noPointComponent = new NoPointView(this._filterType);
    render(this._routeComponent, this._noPointComponent, RenderPosition.BEFOREEND);
  }
}

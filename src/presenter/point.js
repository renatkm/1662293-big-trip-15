import PointView from '../view/point.js';
import PointEditView from '../view/point-edit.js';
import {render, RenderPosition, replace} from '../utils/render.js';

export default class Point {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleViewClick = this._handleViewClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setViewClickHandler(this._handleViewClick);

    render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _replaceViewToEdit() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._keydownHandler);
  }

  _replaceEditToView() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._keydownHandler);
  }

  _keydownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceEditToView();
    }
  }

  _handleEditClick() {
    this._replaceViewToEdit();
  }

  _handleFormSubmit() {
    this._replaceEditToView();
  }

  _handleViewClick() {
    this._replaceEditToView();
  }
}

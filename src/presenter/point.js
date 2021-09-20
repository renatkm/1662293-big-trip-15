import PointView from '../view/point.js';
import PointEditView from '../view/point-edit.js';
import {remove, render, RenderPosition, replace} from '../utils/render.js';

export default class Point {
  constructor(pointListContainer, handlePointUpdate) {
    this._pointListContainer = pointListContainer;
    this._handlePointUpdate = handlePointUpdate;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleViewClick = this._handleViewClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setViewClickHandler(this._handleViewClick);

    if (prevPointComponent === null || prevPointEditComponent === null){
      render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._pointListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointListContainer.getElement().contains(prevPointEditComponent.getElement())) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  delete(){
    remove(this._pointComponent);
    remove(this._pointEditComponent);
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

  _handleFormSubmit(point) {
    this._handlePointUpdate(point);
    this._replaceEditToView();
  }

  _handleViewClick() {
    this._replaceEditToView();
  }

  _handleFavoriteClick() {
    this._handlePointUpdate(
      Object.assign(
        {},
        this._point,
        {
          isFavorite: !this._point.isFavorite,
        },
      ),
    );
  }
}

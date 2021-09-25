import PointEditView from '../view/point-edit.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';
import {nanoid} from 'nanoid';

export default class PointNew {
  constructor(pointListContainer, handlePointUpdate) {
    this._pointListContainer = pointListContainer;
    this._handlePointUpdate = handlePointUpdate;

    this._pointEditComponent = null;

    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._pointEditComponent = new PointEditView();

    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  delete(){
    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.delete();
    }
  }

  _handleDeleteClick() {
    this.delete();
  }

  _handleFormSubmit(point) {
    this._handlePointUpdate(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      Object.assign({id: nanoid()}, point),
    );
    this.delete();
  }
}

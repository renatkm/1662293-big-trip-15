import PointEditView from '../view/point-edit.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

class PointNew {
  constructor(pointListContainer, handlePointUpdate) {
    this._pointListContainer = pointListContainer;
    this._handlePointUpdate = handlePointUpdate;

    this._pointEditComponent = null;
    this._onCloseCallback = null;

    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(offers, destinations, onCloseCallback) {
    if (this._pointEditComponent !== null) {
      return;
    }

    this._onCloseCallback = onCloseCallback;
    this._pointEditComponent = new PointEditView({offers, destinations});

    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  delete() {
    if (this._pointEditComponent === null) {
      return;
    }

    if (this._onCloseCallback !== null) {
      this._onCloseCallback();
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  processSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  processAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isDeleting: false,
        isSaving: false,
      });
    };

    this._pointEditComponent.shake(resetFormState);
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
      point,
    );
  }
}

export default PointNew;

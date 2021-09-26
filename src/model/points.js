import AbstractObserver from './abstract-observer.js';

export default class Points extends AbstractObserver {
  constructor(){
    super();
    this._points = [];
  }

  setPoints(updateType, points){
    this._points = points.slice();

    this._notify(updateType);
  }

  getPoints(){
    return this._points;
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((item) => item.id === update.id);

    if (index === -1) {
      return this._points;
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        basePrice: point['base_price'],
        arrivalTime: point['date_from'],
        departureTime: point['date_to'],
        isFavorite: point['is_favorite'],
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  static adaptToServer(point){
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'base_Price': point.basePrice,
        'date_from': point.arrivalTime,
        'date_to': point.departureTime,
        'is_favorite': point.isFavorite,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.basePrice;
    delete adaptedPoint.arrivalTime;
    delete adaptedPoint.departureTime;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import SmartView from './smart.js';
import {CanvasType} from '../const.js';
import {getDurationTime} from '../utils/common.js';

const BAR_HEIGHT = 55;

const generateChartConfiguration = (title, dataLabels, dataSet, formatter) => ({
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: dataLabels,
    datasets: [{
      data: dataSet,
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      anchor: 'start',
    }],
  },
  options: {
    layout: {
      padding: {
        left: 45,
      },
    },
    plugins: {
      datalabels: {
        font: {
          size: 13,
        },
        color: '#000000',
        anchor: 'end',
        align: 'start',
        formatter: formatter,
      },
    },
    title: {
      display: true,
      text: title,
      fontColor: '#000000',
      fontSize: 23,
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#000000',
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      }],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  },
});

const createMoneyChart = (canvasElement, points, pointLabels) => {
  const sequence =  Array.from(points.reduce(
    (point, { type, basePrice }) => {
      const accumulatedPrice = point.get(type) || 0;
      return point.set(type, accumulatedPrice + basePrice);
    },
    new Map));

  const dataSet = sequence.map((it) => it[1]);

  return new Chart(canvasElement, generateChartConfiguration('MONEY', pointLabels, dataSet, (val) => `€ ${val}`));
};

const createTypeChart = (canvasElement, points, pointLabels) => {
  const sequence =  Array.from(points.reduce((point, {type}) => {
    const accumulatedCounter = point.get(type) || 0;
    return point.set(type, accumulatedCounter + 1);
  }, new Map));

  const dataSet = sequence.map((it) => it[1]);

  return new Chart(canvasElement, generateChartConfiguration('TYPE', pointLabels, dataSet, (val) => `${val}x`));
};

const createTimeChart = (canvasElement, points, pointLabels) => {
  const sequence =  Array.from(points.reduce((point, { type, arrivalTime, departureTime }) => {
    const accumulatedDuration = point.get(type) || 0;
    return point.set(type, accumulatedDuration + dayjs(departureTime).diff(dayjs(arrivalTime)));
  }, new Map));

  const dataSet = sequence.map((it) => it[1]);

  return new Chart(canvasElement, generateChartConfiguration('TIME-SPEND', pointLabels, dataSet, (val) => `${getDurationTime(val)}`));
};

const createStatsTemplate = () => {
  const canvasTypes = Object.values(CanvasType);

  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>
    ${canvasTypes.map((id) => `
    <div class="statistics__item">
      <canvas class="statistics__chart" id="${id}" width="900"></canvas>
    </div>`).join('')}
  </section>`;
};

export default class Stats extends SmartView {
  constructor(points) {
    super();
    this._points = points;

    this._moneyChartComponent = null;
    this._typeChartComponent = null;
    this._timeChartComponent = null;
    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    this._moneyChartComponent = null;
    this._typeChartComponent = null;
    this._timeChartComponent = null;
  }

  getTemplate() {
    return createStatsTemplate(this._points);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    const moneyCanvasElement = this.getElement().querySelector('#money');
    const typeCanvasElement = this.getElement().querySelector('#type');
    const timeCanvasElement = this.getElement().querySelector('#time-spend');

    moneyCanvasElement.height = BAR_HEIGHT * 5;
    typeCanvasElement.height = BAR_HEIGHT * 5;
    timeCanvasElement.height = BAR_HEIGHT * 5;

    const types = this._points.map((point) => point.type);
    const distinctPointTypes = [...new Set(types)];

    this._moneyChartComponent = createMoneyChart(moneyCanvasElement, this._points, distinctPointTypes);
    this._typeChartComponent = createTypeChart(typeCanvasElement, this._points, distinctPointTypes);
    this._timeChartComponent = createTimeChart(timeCanvasElement, this._points, distinctPointTypes);
  }
}

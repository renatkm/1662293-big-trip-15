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

const moneyChart = (chartElement, points, pointLabels) => {
  const moneyArray =  Array.from(points.reduce((point, { type, basePrice }) => point.set(type, (point.get(type) || 0) + basePrice), new Map));
  const dataSet = moneyArray.map((it) => it[1]);

  return new Chart(chartElement, generateChartConfiguration('MONEY', pointLabels, dataSet, (val) => `€ ${val}`));
};

const typeChart = (chartElement, points, pointLabels) => {
  const sequence =  Array.from(points.reduce((point, {type}) => point.set(type, (point.get(type) || 0) + 1), new Map));
  const dataSet = sequence.map((it) => it[1]);

  return new Chart(chartElement, generateChartConfiguration('TYPE', pointLabels, dataSet, (val) => `${val}x`));
};

const timeChart = (chartElement, points, pointLabels) => {
  const sequence =  Array.from(points.reduce((point, { type, arrivalTime, departureTime }) => point.set(type, (point.get(type) || 0) + dayjs(departureTime).diff(dayjs(arrivalTime))), new Map));
  const dataSet = sequence.map((it) => it[1]);

  return new Chart(chartElement, generateChartConfiguration('TIME-SPEND', pointLabels, dataSet, (val) => `${getDurationTime(val)}`));
};

const createStatisticsTemplate = () => {
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
    return createStatisticsTemplate(this._points);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    const moneyCtxElement = this.getElement().querySelector('#money');
    const typeCtxElement = this.getElement().querySelector('#type');
    const timeCtxElement = this.getElement().querySelector('#time-spend');

    moneyCtxElement.height = BAR_HEIGHT * 5;
    typeCtxElement.height = BAR_HEIGHT * 5;
    timeCtxElement.height = BAR_HEIGHT * 5;

    const types = this._points.map((point) => point.type);
    const distinctPointTypes = [...new Set(types)];

    this._moneyChartComponent = moneyChart(moneyCtxElement, this._points, distinctPointTypes);
    this._typeChartComponent = typeChart(typeCtxElement, this._points, distinctPointTypes);
    this._timeChartComponent = timeChart(timeCtxElement, this._points, distinctPointTypes);
  }
}

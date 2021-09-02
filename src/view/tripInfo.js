import {createTripSummaryTemplate} from './tripSummary.js';
import {createTripCostTemplate} from './tripCost.js';

export const createTripInfoTemplate = () => `<section class="trip-main__trip-info  trip-info">
${createTripSummaryTemplate()}
${createTripCostTemplate()}
</section>`;

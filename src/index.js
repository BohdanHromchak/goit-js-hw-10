import './css/styles.css';
// https://www.npmjs.com/package/throttle-debounce
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

import { fetchCountries } from './fetchCountries';

const input = document.querySelector('#search-box');
input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {

    console.log(fetchCountries(input.value));

}

import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const country = input.value.trim();
  fetchCountries(country)
    .then(countries => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';

      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length >= 2 && countries.length <= 10) {
        createListMarkup(countries);
      } else if (countries.length === 1) {
        createCountryMarkup(countries);
      }
    })
    .catch(() =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function createListMarkup(countries) {
  const listMarkup = countries
    .map(
      ({ flags, name }) =>
        `<li class="country-list__item"><img src="${flags.svg}" alt="${name}" class="country-list__img"/>${name.official}</li>`
    )
    .join('');

  countryList.insertAdjacentHTML('beforeend', listMarkup);
}

function createCountryMarkup(countries) {
  const countryMarkup = countries
    .map(
      ({ flags, name, capital, population, languages }) =>
        `<div class="country-info__title"><img src="${flags.svg}" alt="${
          name.official
        }" class="country-info__img"/>${name.official}</div>
<ul class="country-info__list">
  <p class="country-info__item"><b>Capital:</b>${capital}</p>
  <p class="country-info__item"><b>Population:</b>${population}</p>
  <p class="country-info__item"><b>Languages:</b>${Object.values(languages)}</p>
</ul>`
    )
    .join('');

  countryInfo.insertAdjacentHTML('beforeend', countryMarkup);
}

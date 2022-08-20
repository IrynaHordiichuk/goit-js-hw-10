import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import api from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const countriesInput = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');

countriesInput.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler(event) {

  let name = event.target.value.trim(' ');
  if(!name) {
    countriesList.innerHTML = '';
    return
  }
   
  api.fetchCountries(name)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.' );
      } else if (countries.length >= 2 && countries.length <= 10) {
        renderListSmall(countries);
      } else if (countries.length === 1) {
        renderListBig(countries);
      }
    })
    .catch(error => {
      console.log(error);
      Notiflix.Report.failure('Oops, there is no country with that name');
    });
}

function renderListBig(countries) {
  const markup = countries
    .map(item => {
      return `
            <li>
              <img src="${item.flags.svg}"width=90px>
              <p>${item.name.official}</p>
              <p>Capital: ${item.capital}</p>
              <p>Population: ${item.population}</p>
              <p>Languages: ${Object.values(item.languages)}</p>
            </li>
        `;
    })
    .join('');
  countriesList.innerHTML = markup;
}

function renderListSmall(countries) {
  const markup = countries
    .map(item => {
      return `
            <li>
              <img src="${item.flags.svg}"width=90px>
              <p>${item.name.official}</p>
            </li>
        `;
    })
    .join('');
  countriesList.innerHTML = markup;
}

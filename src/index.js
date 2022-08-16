import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
// Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
// Notiflix.Report.failure("Oops, there is no country with that name");
const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name/';



const countriesInput = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
console.log(countriesList);

countriesInput.addEventListener("input", debounce(inputHandler, 2000));

function inputHandler(event){
    event.preventDefault();
    let userInput = event.target.value;
    let url = `${BASE_URL}${userInput}?fields=name,capital,flags,population,languages`
    if(!userInput){countriesList.innerHTML = ''};
   
    fetchCountries(url)
    .then((countries) => {if (countries.length > 9){ 
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")}})
    .then (renderCountriesList(countries))
    .catch((error) => console.log(error))
}




function fetchCountries(name) {
    return fetch(name)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
  
  function renderCountriesList(countries) {
    const markup = countries
      .map((item) => {
        return `
            <li>
              <img src="${item.flags.svg}"width=70px>
              <p>${item.name.official}</p>
              <p>Capital: ${item.capital}</p>
              <p>Population: ${item.population}</p>
              <p>Languages: ${Object.values(item.languages)}</p>
            </li>
        `;
      })
      .join("");
    countriesList.innerHTML = markup;
  }





import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

import { fetchCountries } from "./js/fetchCountries";

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput(evt){
    const name = inputEl.value.trim();
    if (name === '') {
       return clearHTML();
    }
    fetchCountries(name).then(country => {
        clearHTML();
        if (country.length === 1) {
            createOneCountryMarkup(country);
        } else if(country.length >= 10){
            Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.');
        } else {
            createListOfCountryMarkup(country);
        };
    })
        .catch(Notiflix.Notify.warning('Oops, there is no country with that name'));
};


function clearHTML() {
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
};


function createOneCountryMarkup() {
    const countryMarkup = country.map(({ name, flags, capital, population, languages }) => `<li class="country-list__item">
        <img class="country-list__item--flag" src="${flags.svg}" alt="flag of ${name.official}">
        <h2 class="country-list__item--name">${name.official}</h2>
        <h3 class="country-list__item--capital">Capital:${capital}</h3>
        <p class="country-list__item--population">Population:${population}</p>
        <p class="country-list__item--languages">Languages:${languages}</p>
      </li>`)
    
    countryInfoEl.innerHTML = countryMarkup.join(" ");
};


function createListOfCountryMarkup() {
    const listMarkup = country.map(({ name, flags }) => `
        <li class="country-list__item">
        <img class="country-list__item--flag" src="${flags.svg}" alt="flag of ${name.official}">
        <h2 class="country-list__item--name">${name.official}</h2>
        </li>`)
    
    countryListEl.innerHTML = listMarkup.join(" ");
};
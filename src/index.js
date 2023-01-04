import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

import { fetchCountries } from "./js/fetchCountries";

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput(){
    const name = inputEl.value.trim();
    if (name === '') {
       return clearHTML();
    }
    fetchCountries(name).then(country => {
        clearHTML();
        if (country.length === 1) {
            createOneCountryMarkup(country);
        } else if(country.length >= 10){
           tooManyOptions();
        } else {
            createListOfCountryMarkup(country);
        };
    })
        .catch(wrongName);
};


function clearHTML() {
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
};

function wrongName() {
    Notiflix.Notify.failure('Oops, there is no country with that name')
};

function tooManyOptions() {
    Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.')
};

function createOneCountryMarkup(country) {
    const countryMarkup = country.map(({ name, flags, capital, population, languages }) => `
        <div class="country-list_conteiner">
            <img class="country-list__item--flag" src="${flags.svg}" alt="flag of ${name.official}">
            <h2 class="country-list__item--name">${name.official}</h2>
        </div>
        <h3 class="country-list__item--capital">Capital: ${capital}</h3>
        <p class="country-list__item--population">Population: ${population}</p>
        <p class="country-list__item--languages">Languages: ${Object.values(languages).join(', ')}</p>`)
    
    countryInfoEl.innerHTML = countryMarkup.join(" ");
};


function createListOfCountryMarkup(country) {
    const listMarkup = country.map(({ name, flags }) => `
        <li class="country-list__item">
            <div class="country-list_conteiner">
                <img class="country-list__item--flag" src="${flags.svg}" alt="flag of ${name.official}">
                <h2 class="country-list__item--name">${name.official}</h2>
            </div>
        </li>`)
    
    countryListEl.innerHTML = listMarkup.join(" ");
};
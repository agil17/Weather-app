import { getCurrentWeatherBySearch } from './functions';
import { replaceMainContent } from './dom-manipulation';

const radioBtnEvtList = () => {
  const searchValue = document.querySelector('#search-input').value;
  if (searchValue === '') return;
  replaceMainContent();
  getCurrentWeatherBySearch(searchValue);
};

const addEventListenerToRadioBtn = () => {
  const radioBtns = document.getElementsByName('radio');
  radioBtns.forEach((radio) => {
    radio.addEventListener('click', radioBtnEvtList);
  });
};

const addFormEventHandler = (e) => {
  e.preventDefault();

  const searchValue = document.querySelector('#search-input').value;
  if (searchValue === '') return;
  replaceMainContent();
  getCurrentWeatherBySearch(searchValue);
};

const formSubmitEventControl = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', addFormEventHandler);
};

export { formSubmitEventControl, addEventListenerToRadioBtn };

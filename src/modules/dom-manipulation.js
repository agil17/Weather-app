const replaceMainContent = () => {
  const main = document.querySelector('main');
  main.replaceChildren();
}

const tempRadioBtn = () => {
  const radioEl = document.getElementsByName('radio');
  let radioValue = null;
  radioEl.forEach((radio) => {
    if (radio.checked) {
      radioValue = radio.value;
    }
  });

  return radioValue;
};

const displayForecastData = (data) => {
  const mainForecastData = document.querySelector('main');

  data.forEach((day) => {
    // create card
    const card = document.createElement('section');
    card.classList.add('forecast-day');
    mainForecastData.appendChild(card);

    // day div
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    dayDiv.textContent = day.date;

    // img desc div
    const imgDescDiv = document.createElement('div');
    imgDescDiv.classList.add('img-description-container');

    const imgEl = document.createElement('img');
    imgEl.src = `http:${day.day.condition.icon}`;
    imgEl.alt = 'weather-icon';
    imgEl.classList.add('forecast-day-icon');

    const weatherDescEl = document.createElement('p');
    weatherDescEl.textContent = day.day.condition.text;
    imgDescDiv.appendChild(imgEl);
    imgDescDiv.appendChild(weatherDescEl);

    // forecast temp div
    const forecastTempDiv = document.createElement('div');
    forecastTempDiv.classList.add('forecast-temp-container');

    const tempHigh = document.createElement('p');
    tempHigh.classList.add('temp-high');

    const tempLow = document.createElement('p');
    tempLow.classList.add('temp-low');

    if (tempRadioBtn() === 'f') {
      tempHigh.textContent = `High: ${day.day.maxtemp_f}°`;
      tempLow.textContent = `Low: ${day.day.mintemp_f}°`;
    } else {
      tempHigh.textContent = `High: ${day.day.maxtemp_c}°`;
      tempLow.textContent = `Low: ${day.day.mintemp_c}°`;
    }

    forecastTempDiv.appendChild(tempHigh);
    forecastTempDiv.appendChild(tempLow);

    // append divs to card
    card.appendChild(dayDiv);
    card.appendChild(imgDescDiv);
    card.appendChild(forecastTempDiv);
  });
};

const displayCurrInitLocation = (data) => {
  // current city name
  const cityNameEl = document.querySelector('.city-name');
  cityNameEl.textContent = data.location.name;

  // current region name
  const regionNameEl = document.querySelector('.region');
  regionNameEl.textContent = data.location.region;

  // current country name
  const countryNameEl = document.querySelector('.country');
  countryNameEl.textContent = data.location.country;
};

const displayCurrInitialWeather = (data) => {
  const radioValue = tempRadioBtn() === 'f' ? 'f' : 'c';

  // Set temp degrees
  const currDegEl = document.querySelector('#current-weather-degrees');
  currDegEl.textContent =
    radioValue === 'f' ? `${data.current.temp_f}°` : `${data.current.temp_c}°`;

  // Set curr temp icon
  const imgCurrentEl = document.querySelector('#current-weather-icon');
  const currentImgSrc = data.current.condition.icon;
  imgCurrentEl.src = `http:${currentImgSrc}`;

  // Set curr temp description
  const currTempText = document.querySelector('.current-weather-description');
  currTempText.textContent = data.current.condition.text;
};

const displayInitialData = (data) => {
  // console.log(data);

  // // Get farenheit or celcius
  // const radioEl = document.getElementsByName('radio');
  // let radioValue = null;
  // radioEl.forEach((radio) => {
  //   if (radio.checked) {
  //     radioValue = radio.value;
  //   }
  // });

  // // Current Weather

  // // Set temp degrees
  // const currDegEl = document.querySelector('#current-weather-degrees');
  // currDegEl.textContent =
  //   radioValue === 'f' ? `${data.current.temp_f}` : `${data.current.temp_c}`;

  // // setTimeout(() => {
  // //   currDegEl.textContent =
  // //     radioValue === 'f'
  // //       ? `${data.current.temp_f}°`
  // //       : `${data.current.temp_c}°`;
  // // }, 0);

  // // Set curr temp icon
  // const imgCurrentEl = document.querySelector('#current-weather-icon');
  // const currentImgSrc = data.current.condition.icon;
  // imgCurrentEl.src = `http:${currentImgSrc}`;

  // // Set curr temp description
  // const currTempText = document.querySelector('.current-weather-description');
  // currTempText.textContent = data.current.condition.text;

  displayCurrInitialWeather(data);
  displayCurrInitLocation(data);
  displayForecastData(data.forecast.forecastday);
};

const consLog = () => {
  console.log('Shut up errors');
};

export { displayInitialData, replaceMainContent };

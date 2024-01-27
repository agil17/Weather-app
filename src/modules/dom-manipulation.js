const displayInitialData = (data) => {
  console.log(data);

  // Get farenheit or celcius
  const radioEl = document.getElementsByName('radio');
  let radioValue = null;
  radioEl.forEach((radio) => {
    if (radio.checked) {
      radioValue = radio.value;
    }
  });
  

  // Set temp degrees

  const currDegEl = document.querySelector("#current-weather-degrees");
  currDegEl.textContent = radioValue === "f" ? `${data.current.temp_f}` : `${data.current.temp_c}`;

  
  setTimeout(() => {
    currDegEl.textContent = radioValue === "f" ? `${data.current.temp_f}°` : `${data.current.temp_c}°`;
  }, 0);


//   currDegEl = "HTML Changed";

  //   if (radioValue === 'f') {
//     const currTempDegEl = document.querySelector('.current-weather-degrees');
//     currTempDegEl.textContent = '';
//     console.log('f checked');
//     console.log(data.current.temp_f);
//     currTempDegEl.textContent = data.current.temp_f;
//   } else {
//     console.log('c checked');
//     // currTempDegEl.textContent = `${data.current.temp_c}°`;
//   }

  // Current Weather
  const imgCurrentEl = document.querySelector('#current-weather-icon');
  const currentImgSrc = data.current.condition.icon;
  imgCurrentEl.src = `http:${currentImgSrc}`;

  const currWeatherDegEl = document.querySelector('.current-weather-degrees');

  currWeatherDegEl.textContent = ''; // delete this later
};

const consLog = () => {
  console.log('Shut up errors');
};

export { displayInitialData, consLog };

import { displayInitialData } from './dom-manipulation';

const getDateToString = (date) => {
  const newDateObj = new Date(date).toUTCString();

  const [day, num, month] = newDateObj.split(' ');
  const dayStr = day.slice(0, 3);

  const newDateStr = `${dayStr} ${month} ${num}`;

  return newDateStr;
};

const getForeCastData = (data) => {
  const relForecastData = [];
  data.forEach((day, index) => {
    relForecastData[index] = {};
    relForecastData[index].date = getDateToString(day.date);
    relForecastData[index].day = {};
    relForecastData[index].day.maxtemp_c = day.day.maxtemp_c;
    relForecastData[index].day.maxtemp_f = day.day.maxtemp_f;
    relForecastData[index].day.mintemp_c = day.day.mintemp_c;
    relForecastData[index].day.mintemp_f = day.day.mintemp_f;
    relForecastData[index].day.condition = {};
    relForecastData[index].day.condition.text = day.day.condition.text;
    relForecastData[index].day.condition.icon = day.day.condition.icon;
  });

  return relForecastData;
};

const getRelevantData = (data) => {
  const relData = {};
  relData.location = {};
  relData.location.name = data.location.name;
  relData.location.region = data.location.region;
  relData.location.country = data.location.country;
  relData.location.localTime = data.location.localtime.toString().slice(0, 10);
  relData.location.day = getDateToString(relData.location.localTime);

  relData.current = {};
  relData.current.temp_c = data.current.temp_c;
  relData.current.temp_f = data.current.temp_f;

  relData.current.condition = {};

  relData.current.condition.text = data.current.condition.text;
  relData.current.condition.icon = data.current.condition.icon;

  relData.forecast = {};
  relData.forecast.forecastday = getForeCastData(data.forecast.forecastday);

  return relData;
};

const getCurrentWeatherByIp = async () => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=auto%3Aip&days=3&key=6e3c7afaec864344a66232148241901`,
      { mode: 'cors' },
    );

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }

    const data = await response.json();
    const relData = getRelevantData(data);

    displayInitialData(relData);
  } catch (error) {
    console.log(error);
  }
};

const getCurrentWeatherBySearch = async (search) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${search}&days=3&key=6e3c7afaec864344a66232148241901`,
      { mode: 'cors' },
    );

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }

    const data = await response.json();
    const relData = getRelevantData(data);

    displayInitialData(relData);
  } catch (error) {
    console.log(error);
  }
};

export { getCurrentWeatherByIp, getCurrentWeatherBySearch };

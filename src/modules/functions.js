import { displayInitialData } from "./dom-manipulation";

const getDateToString = (date) => {
  const newDateObj = new Date(date).toUTCString();
  // const newDateStr = newDateObj.toString().slice(0, 10);
  // console.log(newDateStr);
  const [day, num, month] = newDateObj.split(' ');
  const dayStr = day.slice(0, 3);

  const newDateStr = `${dayStr} ${month} ${num}`;

  return newDateStr;
};

const getForeCastData = (data) => {
  const relForecastData = [];
  data.forEach((day, index) => {
    relForecastData[index] = {};
    // console.log(relForecastData[index]);
    // relForecastData[index].date = date
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
  // const dayOfWeek = [
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //     "Sunday"
  // ]
  // console.log(data);
  const relData = {};
  relData.location = {};
  relData.location.name = data.location.name;
  relData.location.region = data.location.region;
  relData.location.country = data.location.country;
  relData.location.localTime = data.location.localtime.toString().slice(0, 10);
  // relData.location.day = dayOfWeek[new Date(data.location.localtime.split(' ')[0]).getDay()];
  // console.log(new Date(data.location.localtime.split(' ')[0]).toString().slice(0, 10));
  // relData.location.day = new Date(data.location.localtime.split(' ')[0])
  //   .toString()
  //   .slice(0, 10);
  // relData.location.day = getDateToString()
  relData.location.day = getDateToString(relData.location.localTime);



  relData.current = {};
  relData.current.temp_c = data.current.temp_c;
  relData.current.temp_f = data.current.temp_f;

  relData.current.condition = {};

  relData.current.condition.text = data.current.condition.text;
  relData.current.condition.icon = data.current.condition.icon;

  relData.forecast = {};
  relData.forecast.forecastday = getForeCastData(data.forecast.forecastday);

  // console.log(data)
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
    // console.log(data.current.condition.icon.slice(2));
    // const img = document.querySelector('img');
    // const imgSrc = data.current.condition.icon;
    // img.src = `http:${imgSrc}`;
    const relData = getRelevantData(data);
    // console.log(relData);

    displayInitialData(relData);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const consLog = () => {
  console.log('Stuff to shut up errors');
};

export { getCurrentWeatherByIp, consLog };

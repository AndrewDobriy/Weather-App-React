import React, { useState } from 'react';
const api = {
  key: 'b441b9ff023841eb07082511dea7d63f',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    // let EnMonths = [
    //   'January',
    //   'February',
    //   'March',
    //   'April',
    //   'May',
    //   'June',
    //   'July',
    //   'August',
    //   'September',
    //   'October',
    //   'November',
    //   'December',
    // ];
    let RuMonths = [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Майя',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ];
    // let EnDays = [
    //   'Sunday',
    //   'Mondey',
    //   'Tuesday',
    //   'Wednesday',
    //   'Thursday',
    //   'Friday',
    //   'Saturday',
    // ];
    let RuDays = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ];

    let day = RuDays[d.getDay()];
    let date = d.getDate();
    let month = RuMonths[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  };

  let weatherTemp = '';

  // Clear, Clouds, Rain, Snow
  if (weather.weather) {
    switch (weather.weather[0].main) {
      case 'Clouds':
        weatherTemp = 'App cloud';
        break;
      case 'Snow':
        weatherTemp = 'App snow';
        break;
      case 'Clear':
        weatherTemp = 'App clear';
        break;
      case 'Rain':
        weatherTemp = 'App rain';
        break;
      case 'Haze':
        weatherTemp = 'App haze';
        break;
      case 'fog':
        weatherTemp = 'App haze';
        break;
      default:
        weatherTemp = 'App';
        break;
    }
  } else {
    weatherTemp = 'App';
  }

  return (
    <div className={typeof weather.main != 'undefined' ? weatherTemp : 'App'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Поиск..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        {typeof weather.name != 'undefined' ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="feels">
                Ощущается как {Math.round(weather.main.feels_like)}
              </div>
              <div className="wind">
                Ветер {Math.round(weather.wind.speed)} М/C
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;

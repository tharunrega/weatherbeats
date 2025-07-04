import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  async getCurrentWeather(lat, lon) {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return this.processWeatherData(response.data);
  },

  async getWeatherByCity(city) {
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return this.processWeatherData(response.data);
  },

  processWeatherData(data) {
    return {
      temperature: Math.round(data.main.temp),
      condition: this.normalizeCondition(data.weather[0].main),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind?.speed || 0,
      pressure: data.main.pressure,
      location: {
        city: data.name,
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon
      },
      timestamp: new Date()
    };
  },

  normalizeCondition(condition) {
    const mapping = {
      'Clear': 'sunny',
      'Clouds': 'cloudy', 
      'Rain': 'rainy',
      'Drizzle': 'rainy',
      'Thunderstorm': 'rainy',
      'Snow': 'snowy',
      'Mist': 'foggy',
      'Fog': 'foggy',
      'Haze': 'foggy'
    };
    return mapping[condition] || 'cloudy';
  }
};
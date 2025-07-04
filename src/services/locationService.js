import axios from 'axios';

const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;

export const locationService = {
  // Get current location using browser API
  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  },

  // Get location by IP as fallback
  async getLocationByIP() {
    try {
      const response = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${GEO_API_KEY}`
      );
      
      return {
        lat: parseFloat(response.data.latitude),
        lon: parseFloat(response.data.longitude),
        city: response.data.city,
        country: response.data.country_name
      };
    } catch (error) {
      console.error('IP geolocation failed:', error);
      throw error;
    }
  },

  // Get location with fallback
  async getLocation() {
    try {
      return await this.getCurrentLocation();
    } catch (error) {
      console.log('GPS failed, trying IP location:', error);
      return await this.getLocationByIP();
    }
  }
};
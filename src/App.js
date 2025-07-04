import React, { useState, useEffect } from 'react';
import { weatherService } from './services/weatherService';
import { locationService } from './services/locationService';
import SpotifyAuth from './components/SpotifyAuth';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [spotifyToken, setSpotifyToken] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Get location
        const location = await locationService.getLocation();
        
        // Get weather for location
        const weatherData = await weatherService.getCurrentWeather(
          location.lat, 
          location.lon
        );
        
        setWeather(weatherData);
        
        // Check for existing Spotify token
        const token = localStorage.getItem('spotify_access_token');
        if (token) {
          setSpotifyToken(token);
        }
      } catch (error) {
        console.error('App initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <div className="p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">WeatherBeats</h1>
        
        {weather && (
          <div className="mb-8">
            <p className="text-2xl">{weather.temperature}°C in {weather.location.city}</p>
            <p className="text-lg capitalize">{weather.condition}</p>
          </div>
        )}

        {!spotifyToken ? (
          <SpotifyAuth onAuthenticated={setSpotifyToken} />
        ) : (
          <div>
            <p className="text-green-400">✓ Spotify Connected</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
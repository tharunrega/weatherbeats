import React, { useEffect } from 'react';
import { spotifyService } from '../services/spotifyService';

const SpotifyAuth = ({ onAuthenticated }) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      handleCallback(code);
    }
  }, []);

  const handleCallback = async (code) => {
    try {
      const tokenData = await spotifyService.getAccessToken(code);
      localStorage.setItem('spotify_access_token', tokenData.access_token);
      localStorage.setItem('spotify_refresh_token', tokenData.refresh_token);
      onAuthenticated(tokenData.access_token);
      
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error('Spotify authentication failed:', error);
    }
  };

  const handleLogin = () => {
    window.location.href = spotifyService.getAuthUrl();
  };

  return (
    <div className="text-center">
      <button 
        onClick={handleLogin}
        className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
      >
        Connect Spotify
      </button>
    </div>
  );
};

export default SpotifyAuth;
import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

// Debug: Log the values to see if they're loaded correctly
console.log('CLIENT_ID:', CLIENT_ID);
console.log('CLIENT_SECRET:', CLIENT_SECRET ? '***SET***' : 'NOT SET');
console.log('REDIRECT_URI:', REDIRECT_URI);
console.log('Full auth URL:', `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent('user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private user-library-read user-top-read')}`);

export const spotifyService = {
  // Generate authorization URL
  getAuthUrl() {
    const scopes = [
      'user-read-private',
      'user-read-email',
      'playlist-read-private',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-library-read',
      'user-top-read'
    ];

    const authUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${CLIENT_ID}&` +
      `response_type=code&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      `scope=${encodeURIComponent(scopes.join(' '))}`;

    return authUrl;
  },

  // Exchange code for access token
  async getAccessToken(code) {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return response.data;
  },

  // Get music recommendations
  async getRecommendations(accessToken, preferences) {
    const params = new URLSearchParams({
      seed_genres: preferences.genres.slice(0, 3).join(','),
      target_valence: preferences.valence,
      target_energy: preferences.energy,
      target_danceability: preferences.danceability,
      limit: 20
    });

    const response = await axios.get(
      `https://api.spotify.com/v1/recommendations?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    return response.data.tracks;
  }
};
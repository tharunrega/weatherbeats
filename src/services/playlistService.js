import { spotifyService } from './spotifyService';

export const playlistService = {
  async generateWeatherPlaylist(weather, preferences, accessToken) {
    try {
      // Get recommendations from Spotify
      const tracks = await spotifyService.getRecommendations(
        accessToken, 
        preferences
      );

      // Create playlist data
      const playlist = {
        name: `WeatherBeats - ${weather.condition} • ${new Date().toLocaleDateString()}`,
        description: `Perfect music for ${weather.condition} weather in ${weather.location.city}`,
        tracks: tracks.map(track => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map(artist => artist.name),
          album: track.album.name,
          duration: track.duration_ms,
          preview_url: track.preview_url,
          external_urls: track.external_urls,
          uri: track.uri
        })),
        weather: weather,
        preferences: preferences,
        created_at: new Date().toISOString()
      };

      return playlist;
    } catch (error) {
      console.error('Playlist generation failed:', error);
      throw error;
    }
  },

  async createSpotifyPlaylist(playlist, accessToken) {
    try {
      // Get user profile
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const user = await userResponse.json();

      // Create playlist
      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${user.id}/playlists`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: playlist.name,
            description: playlist.description,
            public: false
          })
        }
      );
      
      const createdPlaylist = await playlistResponse.json();

      // Add tracks to playlist
      if (playlist.tracks.length > 0) {
        const trackUris = playlist.tracks.map(track => track.uri);
        
        await fetch(
          `https://api.spotify.com/v1/playlists/${createdPlaylist.id}/tracks`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              uris: trackUris
            })
          }
        );
      }

      return {
        ...playlist,
        spotify_id: createdPlaylist.id,
        spotify_url: createdPlaylist.external_urls.spotify
      };
    } catch (error) {
      console.error('Spotify playlist creation failed:', error);
      throw error;
    }
  }
};
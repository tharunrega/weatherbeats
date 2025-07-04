import React, { useState } from 'react';
import { playlistService } from '../services/playlistService';
import { calculateMusicPreferences } from '../utils/musicMapping';

const PlaylistView = ({ weather, spotifyToken }) => {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  const generatePlaylist = async () => {
    setLoading(true);
    try {
      const preferences = calculateMusicPreferences(weather);
      const generatedPlaylist = await playlistService.generateWeatherPlaylist(
        weather, 
        preferences, 
        spotifyToken
      );
      setPlaylist(generatedPlaylist);
    } catch (error) {
      console.error('Playlist generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveToSpotify = async () => {
    if (!playlist) return;
    
    try {
      const savedPlaylist = await playlistService.createSpotifyPlaylist(
        playlist, 
        spotifyToken
      );
      setPlaylist(savedPlaylist);
      alert('Playlist saved to Spotify!');
    } catch (error) {
      console.error('Save to Spotify failed:', error);
      alert('Failed to save playlist to Spotify');
    }
  };

  const playPreview = (track) => {
    if (currentTrack?.preview_url) {
      const audio = document.getElementById('audio-player');
      audio.pause();
      audio.currentTime = 0;
    }

    if (track.preview_url) {
      setCurrentTrack(track);
      const audio = document.getElementById('audio-player');
      audio.src = track.preview_url;
      audio.play();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-2xl font-bold">Your Weather Playlist</h2>
        <button
          onClick={generatePlaylist}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Playlist'}
        </button>
      </div>

      {playlist && (
        <div>
          <div className="mb-4">
            <h3 className="text-white text-lg font-semibold">{playlist.name}</h3>
            <p className="text-white/70">{playlist.tracks.length} tracks</p>
            
            {!playlist.spotify_id && (
              <button
                onClick={saveToSpotify}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-2"
              >
                Save to Spotify
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {playlist.tracks.map((track, index) => (
              <div
                key={track.id}
                className={`bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors ${
                  currentTrack?.id === track.id ? 'bg-white/30' : ''
                }`}
                onClick={() => playPreview(track)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{track.name}</p>
                    <p className="text-white/70 text-sm">
                      {track.artists.join(', ')}
                    </p>
                  </div>
                  <div className="text-white/50 text-sm">
                    {Math.floor(track.duration / 60000)}:
                    {String(Math.floor((track.duration % 60000) / 1000)).padStart(2, '0')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <audio id="audio-player" style={{ display: 'none' }} />
    </div>
  );
};

export default PlaylistView;
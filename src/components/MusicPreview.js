import React from 'react';
import { calculateMusicPreferences } from '../utils/musicMapping';

const MusicPreview = ({ weather }) => {
  const preferences = calculateMusicPreferences(weather);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mt-4">
      <h3 className="text-white text-xl font-semibold mb-4">
        Music Mood for {weather.condition}
      </h3>
      
      <div className="grid grid-cols-2 gap-4 text-white">
        <div>
          <p>Happiness: {Math.round(preferences.valence * 100)}%</p>
          <p>Energy: {Math.round(preferences.energy * 100)}%</p>
          <p>Danceability: {Math.round(preferences.danceability * 100)}%</p>
        </div>
        <div>
          <p>Acousticness: {Math.round(preferences.acousticness * 100)}%</p>
          <p>Tempo: {preferences.tempo} BPM</p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-white font-medium">Genres:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {preferences.genres.map(genre => (
            <span 
              key={genre}
              className="bg-white/20 px-3 py-1 rounded-full text-sm text-white"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPreview;
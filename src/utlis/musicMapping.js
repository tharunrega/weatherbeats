export const weatherMusicMap = {
    sunny: {
      basePreferences: {
        valence: 0.8,
        energy: 0.7,
        danceability: 0.6,
        acousticness: 0.3,
        tempo: 120,
        genres: ['pop', 'dance', 'indie', 'reggae']
      },
      timeModifiers: {
        morning: { acousticness: 0.5, genres: ['acoustic', 'indie'] },
        afternoon: { danceability: 0.8, energy: 0.9 },
        evening: { valence: 0.6, acousticness: 0.4 },
        night: { energy: 0.4, tempo: 100 }
      }
    },
    
    rainy: {
      basePreferences: {
        valence: 0.4,
        energy: 0.3,
        danceability: 0.3,
        acousticness: 0.7,
        tempo: 80,
        genres: ['indie', 'jazz', 'lo-fi', 'ambient']
      },
      timeModifiers: {
        morning: { valence: 0.5, genres: ['coffee', 'acoustic'] },
        afternoon: { energy: 0.4, genres: ['indie-folk'] },
        evening: { acousticness: 0.8, genres: ['neo-soul'] },
        night: { valence: 0.3, acousticness: 0.9 }
      }
    },
    
    cloudy: {
      basePreferences: {
        valence: 0.5,
        energy: 0.4,
        danceability: 0.4,
        acousticness: 0.5,
        tempo: 90,
        genres: ['indie-rock', 'alternative', 'singer-songwriter']
      }
    },
    
    snowy: {
      basePreferences: {
        valence: 0.6,
        energy: 0.4,
        danceability: 0.3,
        acousticness: 0.6,
        tempo: 75,
        genres: ['classical', 'ambient', 'post-rock', 'indie-folk']
      }
    },
    
    foggy: {
      basePreferences: {
        valence: 0.4,
        energy: 0.3,
        danceability: 0.2,
        acousticness: 0.6,
        tempo: 70,
        genres: ['ambient', 'downtempo', 'trip-hop']
      }
    }
  };
  
  export const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 6) return 'night';
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    if (hour < 22) return 'evening';
    return 'night';
  };
  
  export const calculateMusicPreferences = (weather, userHistory = {}) => {
    const mapping = weatherMusicMap[weather.condition];
    if (!mapping) return weatherMusicMap.cloudy.basePreferences;
  
    let preferences = { ...mapping.basePreferences };
    
    // Apply time-of-day modifiers
    const timeOfDay = getTimeOfDay();
    const timeModifiers = mapping.timeModifiers?.[timeOfDay];
    
    if (timeModifiers) {
      Object.keys(timeModifiers).forEach(key => {
        if (key === 'genres') {
          preferences.genres = [...timeModifiers.genres, ...preferences.genres];
        } else {
          preferences[key] = Math.max(0, Math.min(1, 
            preferences[key] + timeModifiers[key]
          ));
        }
      });
    }
  
    // Apply user learning adjustments
    if (userHistory[weather.condition]) {
      const userPrefs = userHistory[weather.condition];
      Object.keys(userPrefs).forEach(key => {
        if (key !== 'genres') {
          preferences[key] = (preferences[key] + userPrefs[key]) / 2;
        }
      });
    }
  
    return preferences;
  };
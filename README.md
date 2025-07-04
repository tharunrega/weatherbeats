# WeatherBeats 🌤️🎵

A React application that combines weather data with music recommendations to create the perfect soundtrack for any weather condition. WeatherBeats automatically detects your location, fetches current weather information, and provides personalized music recommendations through Spotify integration.

## ✨ Features

- **🌍 Automatic Location Detection**: Uses geolocation to automatically detect your current location
- **🌤️ Real-time Weather Data**: Fetches current weather conditions using OpenWeatherMap API
- **🎵 Spotify Integration**: Seamless authentication and music recommendation system
- **🎨 Modern UI**: Beautiful gradient interface built with Tailwind CSS
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🔐 Secure Authentication**: OAuth 2.0 flow for Spotify integration

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Spotify Developer Account
- OpenWeatherMap API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tharunrega/weatherbeats.git
   cd weatherbeats
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
   REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
   REACT_APP_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   REACT_APP_REDIRECT_URI=http://localhost:3000/callback
   ```

4. **Get API Keys**

   **OpenWeatherMap API Key:**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Get your API key from the dashboard

   **Spotify API Credentials:**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new application
   - Add `http://localhost:3000/callback` to your redirect URIs
   - Copy your Client ID and Client Secret

5. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm run dev` - Alias for npm start
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)


## 🔧 Technologies Used

- **React 19** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **OpenWeatherMap API** - Weather data provider
- **Spotify Web API** - Music recommendations and authentication

## 🌟 How It Works

1. **Location Detection**: The app automatically detects your location using the browser's geolocation API
2. **Weather Fetching**: Current weather data is retrieved from OpenWeatherMap based on your coordinates
3. **Spotify Authentication**: Users can authenticate with Spotify using OAuth 2.0
4. **Music Recommendations**: Based on weather conditions and user preferences, the app suggests appropriate music
5. **Personalized Experience**: The interface adapts to show relevant weather information and music options

## 📱 Usage

1. Allow location access when prompted
2. View your current weather conditions
3. Click "Connect with Spotify" to authenticate
4. Browse personalized music recommendations based on the weather
5. Enjoy your weather-appropriate soundtrack!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Spotify](https://developer.spotify.com/) for music API
- [Create React App](https://create-react-app.dev/) for the development setup
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.

---

**WeatherBeats** - Where weather meets music! 🌤️🎵

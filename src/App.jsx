import axios from 'axios';
import React, { useRef, useState } from 'react'
import './weatherStyles.css';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const fetchWeather = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json`, {
          params: {
            key: 'e3e98122324b454b92f44333241406',
            q: inputRef.current.value,
            aqi: 'no'
          }
        }
      );
      
      setWeatherData(prevData => [response.data, ...prevData]);
      inputRef.current.value = '';
      
    } catch (err) {
      setError('Failed to fetch weather data. Please check the city name and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 animate-gradient">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8 space-x-4">
            <img 
              src="https://avatars.githubusercontent.com/u/153673449?s=400&u=70f498ec5f53a8fe50bead7ef407ec9e5e5a9191&v=4" 
              alt="Developer" 
              className="w-16 h-16 rounded-full border-2 border-white/50 shadow-lg"
            />
            <div className="text-white">
              <h2 className="text-xl font-semibold">Muhammad Farhan</h2>
              {/* <p className="text-white/80">Muhammad Farhan</p> */}
              
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
            Weather Forecast
          </h1>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-8 shadow-lg border-2 border-white/20">
            <form onSubmit={fetchWeather} className="flex gap-4">
              <input 
                type="text" 
                placeholder="Enter city name" 
                ref={inputRef}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 border border-black/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-md"
                disabled={isLoading}
              />
              <button 
                className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </form>
            {error && (
              <div className="mt-4 text-red-100 bg-red-500/20 p-3 rounded-lg">
                {error}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {weatherData.map((item, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-white/5 to-black shadow-lg backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl border border-white group"
              >
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">{item.location.name}</h2>
                    <span className="text-sm bg-black/20 px-2 py-1 rounded-full text-white/90">
                      {new Date(item.location.localtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-white/70">{item.location.region}, {item.location.country}</p>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-end">
                        <span className="text-5xl font-bold text-white group-hover:text-purple-200 transition-colors">
                          {Math.round(item.current.temp_c)}°
                        </span>
                        <span className="text-white/70 ml-1 mb-1">C</span>
                      </div>
                      <p className="text-sm text-white/70">
                        Feels like {Math.round(item.current.feelslike_c)}°
                      </p>
                    </div>
                    <div className="text-right">
                      <img 
                        src={item.current.condition.icon} 
                        alt={item.current.condition.text}
                        className="w-16 h-16 object-contain filter drop-shadow-lg"
                      />
                      <p className="text-sm text-white/90">
                        {item.current.condition.text}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <div>
                        <p className="text-sm text-white/70">Wind</p>
                        <p className="text-white font-medium">{item.current.wind_kph} km/h</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                      <div>
                        <p className="text-sm text-white/70">Humidity</p>
                        <p className="text-white font-medium">{item.current.humidity}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-white/70">UV Index</p>
                        <p className="text-white font-medium">{item.current.uv}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <div>
                        <p className="text-sm text-white/70">Visibility</p>
                        <p className="text-white font-medium">{item.current.vis_km} km</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
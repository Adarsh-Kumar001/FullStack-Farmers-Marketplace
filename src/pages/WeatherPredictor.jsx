import { useState } from "react";

const WeatherPredictor = () => {
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!location) return;
    setLoading(true);
    setError("");

    try {
      // Get latitude & longitude from OpenStreetMap API
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
      );
      const geoData = await geoRes.json();

      if (geoData.length === 0) {
        setError("Location not found.");
        setLoading(false);
        return;
      }

      const { lat, lon } = geoData[0];

      // Fetch 7-day weather forecast from Open-Meteo API
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      setForecast(weatherData.daily);
    } catch (err) {
      setError("Failed to fetch weather data.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">7-Day Weather Predictor</h2>

      {/* Input Box */}
      <div className="flex">
        <input
          type="text"
          placeholder="Enter your city..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={getWeather}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Get Forecast
        </button>
      </div>

      {/* Loading & Error Messages */}
      {loading && <p className="text-center text-gray-500 mt-4">Fetching weather data...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* Weather Forecast Display */}
      {forecast && (
        <div className="mt-6">
          {forecast.time.map((date, index) => (
            <div key={index} className="flex justify-between items-center p-3 border-b">
              <p className="text-gray-700">{new Date(date).toLocaleDateString()}</p>
              <p className="text-gray-500">
                {forecast.temperature_2m_max[index]}°C / {forecast.temperature_2m_min[index]}°C
              </p>
              <p className="text-gray-600">Code: {forecast.weathercode[index]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherPredictor;

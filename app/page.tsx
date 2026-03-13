"use client";
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");

  const emojiMap: Record<string, string> = {
    Clear: "☀️ Sunny — perfect for chai outside!",
    Rain: "🌧️ Rainy — grab your umbrella!",
    Clouds: "☁️ Cloudy — cozy vibes!",
    Thunderstorm: "⛈️ Stormy — stay safe indoors!",
    Drizzle: "🌦️ Light rain — keep a raincoat handy!",
    Snow: "❄️ Snowy — time for hot chocolate!"
  };

  async function getWeather() {
    if (!city) {
      setResult("Please enter a city name.");
      return;
    }

    const apiKey = "0cd6fa42f647ed32b672e1c984d6713c"; // ✅ your active key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},in&appid=${apiKey}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      if (data.cod !== 200) {
        setResult(`Error: ${data.message}`);
        return;
      }

      const condition = data.weather[0].main;
      const temp = data.main.temp;
      const emojiLine = emojiMap[condition] || "🌍 Weather data not mapped yet!";
      setResult(`${emojiLine} | 🌡️ ${temp}°C`);
    } catch (error) {
      setResult("Error fetching weather.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-full max-w-md text-center transition-transform hover:scale-105">
        <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
          🌦️ Weather Mood App
        </h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 w-full mb-4 text-center focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
        <button
          onClick={getWeather}
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:from-yellow-500 hover:to-orange-600 transition-transform hover:scale-105"
        >
          Get Weather
        </button>
        <div className="mt-6 text-xl font-medium text-white drop-shadow-lg animate-fadeIn">
          {result}
        </div>
      </div>
    </div>
  );
}

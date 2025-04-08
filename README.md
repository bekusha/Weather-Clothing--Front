# React Map, Weather & AI Frontend

This is the React frontend for the Weather + AI camping planner app. It allows users to:

Select a location on a map

View 5-day weather forecast

Get AI-generated travel advice based on the forecast

# 🌍 Features

Interactive map using Leaflet

Location search via leaflet-geosearch

Weather data from OpenWeatherMap API

AI integration to suggest travel plans with React Markdown rendering

# 🧱 Tech Stack

React 19

Leaflet / React-Leaflet

Axios

React Markdown

TypeScript (recommended)

# 📦 Dependencies

"axios": "^1.8.4",
"leaflet": "^1.9.4",
"leaflet-geosearch": "^4.2.0",
"react": "^19.0.0",
"react-dom": "^19.0.0",
"react-leaflet": "^5.0.0",
"react-markdown": "^10.1.0"

# 🚀 Getting Started

git clone https://github.com/bekusha/Weather-Clothing--Front.git
cd frontend
npm install

# Add your API key in a .env file
VITE_WEATHER_API_KEY=your_openweathermap_api_key
VITE_API_BASE_URL=your_base_api_url

# Start development server
npm run dev

🔐 Environment Variables

Make sure to create a .env file:

VITE_WEATHER_API_KEY=your_api_key_here

# 🛠 Build

npm run build

Deploy the /dist folder to Netlify or any static hosting.

# 📦 Folder Structure

src/
├── components/
│   ├── AiButton.tsx
│   ├── LeafletSearchControl.tsx
│   |── WeatherModal.tsx
│   |── Map.tsx
│   └── Footer.tsx
│
├── types.t
└── main.tsx

# ✅ Author

Made by [Beka Jorjikia - beka.jorjikia@gmail.com]
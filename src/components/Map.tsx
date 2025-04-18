import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useState } from 'react';
import WeatherModal from "./WeatherModal";
import axios from 'axios'
import { ForecastData } from "../types";
import LeafletSearchControl from "./LeafletSearchControl";


export default function Map() {
    const [forecastData, setForecastData] = useState<ForecastData | null>(null);
    const [showWeatherModal, setShowWeatherModal] = useState(false);

    // FETCH WEATHER FORECAST
    const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY
    const fetchForecast = async (lat: number, lon: number) => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=ge`
            );

            setForecastData(res.data);
            setShowWeatherModal(true);
        } catch (error) {
            console.error("err:", error);
        }
    }

    // GET LOCATION "LATLNG" USING USEMAPEVENTS
    const LocationHandler = () => {
        useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                fetchForecast(lat, lng);
            },
        });
        return null;
    }



    return (
        <div style={{
            height: "60vh",
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
        }}>
            {/* Map Container */}
            <MapContainer center={[41.7151, 44.8271]} zoom={8} style={{ height: "60vh", width: "100%" }}>
                <LeafletSearchControl onLocationSelect={fetchForecast} />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationHandler />

            </MapContainer>
            {/* Weather Modal */}
            <WeatherModal open={showWeatherModal}
                onClose={() => {
                    setShowWeatherModal(false);
                    setForecastData(null);
                }}
                forecastData={forecastData!} />
        </div>
    )
}
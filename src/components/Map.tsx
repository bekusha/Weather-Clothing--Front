import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useState } from 'react';
import WeatherModal from "./WeatherModal";
import axios from 'axios'
import { ForecastData } from "../types";



export default function Map() {
    // Map position
    const [position, setPosition] = useState<[number, number] | null>()

    const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null)
    const [forecastData, setForecastData] = useState<ForecastData | null>(null);
    const [showWeatherModal, setShowWeatherModal] = useState(false);

    // Weather api key
    const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

    const fetchForecast = async (lat: number, lon: number) => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=ge`
            );
            setSelectedCoords([lat, lon]);
            setForecastData(res.data);
            setShowWeatherModal(true);
        } catch (error) {
            console.error("err:", error);
        }
    }


    const LocationHandler = () => {
        useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                fetchForecast(lat, lng);
            },
        });
        return null;
    }



    return (
        <div>
            <MapContainer center={[41.7151, 44.8271]} zoom={8} style={{ height: "90vh", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationHandler />

            </MapContainer>
            <WeatherModal open={showWeatherModal}
                onClose={() => {
                    setShowWeatherModal(false);
                    setForecastData(null);
                }}
                forecastData={forecastData} />
        </div>
    )
}
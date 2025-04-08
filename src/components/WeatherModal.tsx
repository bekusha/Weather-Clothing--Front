import React, { useMemo, useState } from 'react'
import { ForecastData, WeatherModalProps } from '../types';
import AiButton from './AiButton';


const WeatherModal: React.FC<WeatherModalProps> = ({ open, onClose, forecastData }) => {

    const [openDay, setOpenDay] = useState<string | null>(null);



    const getDailyForecast = (forecastList: any[]) => {
        return forecastList.filter(item => item.dt_txt.includes("12:00:00"));
    };

    const dailyForecast = useMemo(() => {
        return forecastData ? getDailyForecast(forecastData.list) : [];
    }, [forecastData]);


    const groupByDay = (forecastList: ForecastData['list']) => {
        const grouped: { [key: string]: ForecastData['list'] } = {};
        forecastList.forEach(item => {
            const date = item.dt_txt.split(" ")[0];
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(item);
        });
        return grouped;
    }

    const groupedForecast = useMemo(() => {
        return forecastData ? groupByDay(forecastData.list) : {};
    }, [forecastData])

    // accordion logic
    const toggleDay = (date: string) => {
        setOpenDay(prev => (prev === date ? null : date));

    }
    const weatherIconMap: { [key: string]: string } = {
        'clear': '☀️',
        'cloud': '☁️',
        'rain': '🌧️',
        'thunder': '⛈️',
        'snow': '❄️',
        'mist': '🌫️',
        'fog': '🌫️',
        'wind': '💨',
        'drizzle': '🌦️',
    };

    const getWeatherIcon = (description: string) => {
        const lower = description.toLowerCase();
        const matched = Object.keys(weatherIconMap).find(key => lower.includes(key));
        return matched ? weatherIconMap[matched] : '🌡️';
    };

    if (!open || !forecastData) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h3>Location: {forecastData.city.name}</h3>
                <h4>Next 5 Days Weather</h4>
                <div style={styles.weatherContainer}>
                    {dailyForecast.map((item, index) => {
                        const date = item.dt_txt.split(" ")[0];
                        const fullDaySlots = groupedForecast[date] || [];

                        return (
                            <div key={index} style={{ background: "#1f1b24", color: "#d1d5db", borderRadius: 10, width: 250, fontSize: 14 }} >
                                <div onClick={() => toggleDay(date)} style={{ cursor: 'pointer', padding: '10px', position: "relative" }}>
                                    <strong>{item.dt_txt}</strong><br />
                                    {item.weather[0].description}, {item.main.temp}°C    <div style={{ position: "absolute", right: 10, top: 10 }}>🕒</div>
                                </div>
                                <div style={{ fontSize: 24 }}>
                                    {getWeatherIcon(item.weather[0].description)}
                                </div>

                                {openDay === date && (
                                    <div style={{ position: "relative" }}>
                                        <div style={{ width: 270, padding: 10, marginTop: 5, position: "absolute", top: 10, background: "#1f1b24", borderRadius: 12, zIndex: 999 }}>
                                            {fullDaySlots.map((slot, idx) => (
                                                <div key={idx} style={{ marginBottom: 5, textAlign: "start" }}>
                                                    {slot.dt_txt.split(' ')[1]} - <span style={{ color: "#a78bfa" }}>{slot.weather[0].description}, {slot.main.temp}°C</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                        );
                    })}
                </div>
                <AiButton forecastData={{
                    city: forecastData.city,
                    list: dailyForecast,
                }} />
                <button style={styles.closeBtn} onClick={onClose}>X</button>
            </div>
        </div >
    )

}

export default WeatherModal;

const styles = {
    overlay: {
        position: 'fixed' as const,
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000,
        transparency: "0%"
    },
    modal: {
        backgroundColor: '#0e0e10',
        color: "#d1d5db",
        padding: 20,
        borderRadius: 10,
        width: '80%',
        height: '80%',
        textAlign: 'center' as const,
        boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)',
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        overflow: "scroll"
    },
    weatherContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row" as const,
        flexWrap: "wrap" as const,
        gap: 20,
    },
    closeBtn: {
        position: 'absolute' as const,
        padding: 15,
        top: 20,
        right: 20,
        fontSize: 16,
        cursor: 'pointer',
        background: "black",
        color: '#a78bfa',
        border: 'none', borderRadius: 6
    },
};
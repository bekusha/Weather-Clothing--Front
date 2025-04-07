import React, { useMemo } from 'react'
import { WeatherModalProps } from '../types';


const WeatherModal: React.FC<WeatherModalProps> = ({ open, onClose, forecastData }) => {
    if (!open || !forecastData) return null;

    const getDailyForecast = (forecastList: any[]) => {
        return forecastList.filter(item => item.dt_txt.includes("12:00:00"));
    };

    const dailyForecast = useMemo(() => {
        return forecastData ? getDailyForecast(forecastData.list) : [];
    }, [forecastData]);

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>{forecastData.city.name} – Weather</h2>
                {dailyForecast.map((item: any, index: number) => (
                    <div key={index} style={styles.day}>
                        <strong>{item.dt_txt}</strong><br />
                        {item.weather[0].description}, {item.main.temp}°C
                    </div>
                ))}

                <button style={styles.closeBtn} onClick={onClose}>X</button>
            </div>
        </div>
    )

}

export default WeatherModal;

const styles = {
    overlay: {
        position: 'fixed' as const,
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        maxWidth: 500,
        width: '90%',
    },
    closeBtn: {
        position: 'absolute' as const,
        top: 10,
        right: 20,
        fontSize: 16,
        cursor: 'pointer',
    },
    day: {
        marginBottom: 10,
        padding: 10,
        borderBottom: '1px solid #eee',
    }
};
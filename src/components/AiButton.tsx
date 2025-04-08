import React, { useState } from 'react'
import { AiButtonProps } from '../types'
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './AiButton.css'

const AiButton: React.FC<AiButtonProps> = ({ forecastData }) => {
    const [loading, setLoading] = useState(false);

    // For Ai Response
    const [response, setResponse] = useState<string | null>(null);
    // Send Data to AI
    const handleClick = async () => {
        setLoading(true)
        const BASE_URL = import.meta.env.VITE_API_BASE_URL
        try {
            const res = await axios.post(`${BASE_URL}/ai/ai-advice/`, {
                forecast: forecastData,
            });
            setResponse(res.data || "Success");

        } catch (error) {
            console.error("Error sending data:", error);
            setResponse("Error occurred");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div style={{ textAlign: 'center' }} onClick={handleClick}>
            {/* Button Title */}
            <p style={{ color: '#a78bfa', marginBottom: 10, cursor: "pointer" }}>
                {loading ? "Please wait a few seconds while we prepare your personalized travel advice..." : "Get AI advice, how to prepare for next week"}
            </p>
            {/* Loading Progress Bar */}
            {loading && (
                <div style={{ width: '100%', maxWidth: 400, margin: '10px auto' }}>
                    <div className="progress-bar" />
                </div>
            )}
            {/* AI RESPONSE */}
            {response &&
                <div style={{ fontSize: 12, maxWidth: 500 }}>
                    {/* React Markdown for Beautify AI Response */}
                    <ReactMarkdown>{response}</ReactMarkdown>
                </div>}
        </div>
    )
}

export default AiButton;

import React from 'react';
import Header from './assets/components/Header';
export default function Streamlit() {
    return (
        <div style={{ height: '100vh' }}>
        <Header/>
            <iframe 
                src="http://localhost:8501" 
                width="100%" 
                height="100%" 
                style={{ border: 'none' }}
                title="Chatbot"
            />
        </div>
    );
}
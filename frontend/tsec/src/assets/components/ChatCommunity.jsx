import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ChatPage.css'; // Import the CSS file
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const ChatPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const eventId = params.get('eventId');
    const userId = params.get('userId');
    console.log(userId);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Fetch messages from the backend when the component mounts
    useEffect(() => {
        fetchMessages();
    }, [messages]);

    // Function to fetch messages
    const fetchMessages = async () => {
        console.log('Fetching messages for event:', eventId);
        try {
            const response = await axios.get(`http://localhost:3000/getMessages?eventId=${eventId}`);
            setMessages(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Function to handle sending a new message
    const handleSendMessage = async () => {
        if (!newMessage.trim()) return; // Do not send empty messages

        const messageData = {
            userId,
            text: newMessage,
            time: new Date().toISOString(),
            eventId
        };

        try {
            await axios.post('http://localhost:3000/sendMessage', messageData);
            setMessages([...messages, messageData]); // Add the new message to the state

            setNewMessage(''); // Clear the input field
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="chat-header">
                <h1>Community Chat</h1>
            </div>
            <div className="chat-page">
                <div className="chat-container">
                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.user_id === userId ? 'user-message' : 'other-message'}`}
                            >
                                <strong>{message.user_id}<br /></strong> {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message here..."
                            className="message-input"
                        />
                        <button onClick={handleSendMessage} className="send-button">Send</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ChatPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SocialMediaPage() {
  const [isChatboxVisible, setChatboxVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Hello! How can I assist you today?', sender: 'gemini' }]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState([]); // State for storing fetched destinations

  // Fetch destinations from the backend when the component mounts
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        let { data } = await axios({
          url: 'http://localhost:3000/destinations', // Replace with your backend URL
          method: 'get',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setDestinations(data); // Assuming data is an array of destinations
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  const toggleChatbox = () => {
    setChatboxVisible(!isChatboxVisible);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = { text: inputValue, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputValue('');

      // Make an Axios call to get Gemini's response
      getGeminiResponse(inputValue);
    }
  };

  const getGeminiResponse = async (userMessage) => {
    try {
      setLoading(true);
      let { data } = await axios({
        url: 'http://localhost:3000/gemini/generate-gemini-content', // Replace with your backend URL
        method: 'post',
        data: {
          prompt: userMessage,
        },
      });

      const geminiResponseText = data.response;
      setMessages((prevMessages) => [...prevMessages, { text: geminiResponseText, sender: 'gemini' }]);
    } catch (error) {
      console.error('Error getting Gemini response:', error);
      setMessages((prevMessages) => [...prevMessages, { text: 'Sorry, there was an error processing your message.', sender: 'gemini' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <a href="#" className="flex-shrink-0 flex items-center text-xl sm:text-2xl font-bold text-blue-600">
                TravelSocial
              </a>
            </div>
            {/* Profile Picture with Dropdown */}
            <div className="relative">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile Picture"
                className="h-10 w-10 rounded-full cursor-pointer"
                id="profileButton"
                onClick={toggleDropdown}
              />
              {/* Dropdown Menu */}
              <div
                id="profileMenu"
                className={`absolute top-10 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 ${isDropdownVisible ? 'block' : 'hidden'}`}
              >
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
                <a href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8 flex-1 overflow-y-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-600">
          Discover Beautiful Destinations
        </h1>
        {/* Destinations and Reviews Section */}
        <div id="destinations" className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white shadow-md rounded-lg p-4">
              <img src={destination.imageUrl} alt={destination.name} className="w-full h-48 object-cover rounded-md" />
              <h2 className="text-xl font-bold mt-2">{destination.name}</h2>
              <p className="text-gray-600">{destination.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gemini Chatbox */}
      <div
        id="chatbox-container"
        className={`fixed bottom-4 right-4 bg-white shadow-lg rounded-lg w-80 max-h-96 ${isChatboxVisible ? 'block' : 'hidden'}`}
      >
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="font-bold text-lg">Gemini Chat</h2>
          <button id="chatbox-close" className="text-white hover:text-gray-200" onClick={() => setChatboxVisible(false)}>
            ×
          </button>
        </div>

        <div className="p-4 overflow-y-auto" id="chatbox-messages" style={{ maxHeight: 320 }}>
          {/* Display messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg shadow-md max-w-xs ${message.sender === 'user' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-300 text-black self-start'}`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="p-2 border-t">
          <input
            type="text"
            id="chat-input"
            placeholder="Type your message..."
            className="w-full p-2 border rounded-md focus:outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            id="send-button"
            className="w-full bg-blue-600 text-white py-2 mt-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            onClick={handleSendMessage}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>

      {/* Chatbox Button (visible only when chatbox is closed) */}
      {!isChatboxVisible && (
        <button id="chatbox-toggle" className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700" onClick={toggleChatbox}>
          Chat with Gemini
        </button>
      )}
    </div>
  );
}

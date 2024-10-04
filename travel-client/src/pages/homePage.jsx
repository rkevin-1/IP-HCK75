import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function SocialMediaPage() {
  const [isChatboxVisible, setChatboxVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleChatbox = () => {
    setChatboxVisible(!isChatboxVisible);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Social Media - Destinations &amp; Reviews</title>
      </Helmet>

      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <a
                href="#"
                className="flex-shrink-0 flex items-center text-xl sm:text-2xl font-bold text-blue-600"
              >
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
                className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 ${
                  isDropdownVisible ? 'block' : 'hidden'
                }`}
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-600">
          Discover Beautiful Destinations
        </h1>
        {/* Destinations and Reviews Section */}
        <div
          id="destinations"
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      </div>

      {/* Gemini Chatbox */}
      <div
        id="chatbox-container"
        className={`fixed bottom-4 right-4 bg-white shadow-lg rounded-lg w-80 max-h-96 overflow-hidden ${
          isChatboxVisible ? 'block' : 'hidden'
        }`}
      >
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="font-bold text-lg">Gemini Chat</h2>
          <button
            id="chatbox-close"
            className="text-white hover:text-gray-200"
            onClick={toggleChatbox}
          >
            ×
          </button>
        </div>
        <div className="p-4 overflow-y-auto" id="chatbox-messages" style={{ maxHeight: 320 }}>
          <p className="text-gray-600">Hello! How can I assist you today?</p>
        </div>
        <div className="p-2 border-t">
          <input
            type="text"
            id="chat-input"
            placeholder="Type your message..."
            className="w-full p-2 border rounded-md focus:outline-none"
          />
          <button
            id="send-button"
            className="w-full bg-blue-600 text-white py-2 mt-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>

      {/* Chatbox Button */}
      <button
        id="chatbox-toggle"
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        onClick={toggleChatbox}
      >
        Chat with Gemini
      </button>
    </>
  );
}

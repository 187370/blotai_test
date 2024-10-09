import React, { useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

interface ChatMessage {
  id: string;
  sender: 'user' | 'contact';
  text: string;
  timestamp: Date;
}

interface ChatHistory {
  [contactId: string]: ChatMessage[];
}

interface ChatAreaProps {
  selectedContact: string | null;
}

const ChatArea: React.FC<ChatAreaProps> = ({ selectedContact }) => {
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatHistory>({})
  const { theme } = useTheme()

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && selectedContact) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text: message.trim(),
        timestamp: new Date(),
      }
      setChatHistory(prevHistory => ({
        ...prevHistory,
        [selectedContact]: [...(prevHistory[selectedContact] || []), newMessage],
      }))
      setMessage('')
    }
  }

  if (!selectedContact) {
    return (
      <div className={`h-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <p className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>Select a contact to start chatting</p>
      </div>
    )
  }

  const currentChatHistory = chatHistory[selectedContact] || []

  return (
    <div className="h-full flex flex-col">
      <div className={`p-4 border-b ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-300'}`}>
        <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Chat with {selectedContact}</h2>
      </div>
      <div className={`flex-1 overflow-y-auto p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        {currentChatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${
              msg.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : theme === 'dark'
                  ? 'bg-gray-700 text-gray-100'
                  : 'bg-gray-200 text-gray-900'
              }`}
            >
              {msg.text}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {msg.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className={`p-4 border-t flex ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-300'}`}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className={`flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark'
              ? 'bg-gray-700 text-gray-100 border-gray-600'
              : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  )
}

export default ChatArea
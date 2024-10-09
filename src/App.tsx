import React, { useState } from 'react'
import { MessageCircle, Users, Settings, LogOut, Sun, Moon } from 'lucide-react'
import ContactList from './components/ContactList'
import ChatArea from './components/ChatArea'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'

function AppContent() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Sidebar */}
      <div className={`w-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} flex flex-col items-center py-4`}>
        <button className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-8`}>
          <MessageCircle size={24} />
        </button>
        <button className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-8`}>
          <Users size={24} />
        </button>
        <button className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-8`}>
          <Settings size={24} />
        </button>
        <button
          onClick={toggleTheme}
          className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-8`}
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <button className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mt-auto`}>
          <LogOut size={24} />
        </button>
      </div>

      {/* Contact List */}
      <div className={`w-64 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-300'} border-r`}>
        <ContactList onSelectContact={setSelectedContact} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1">
        <ChatArea selectedContact={selectedContact} />
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
import React, { useState } from 'react'
import Missile from './Missile'
import { useTheme } from '../contexts/ThemeContext'

interface Contact {
  id: string;
  name: string;
  status: 'online' | 'offline';
}

interface ContactListProps {
  onSelectContact: (contactId: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onSelectContact }) => {
  const [missilePosition, setMissilePosition] = useState<{ x: number; y: number } | null>(null)
  const { theme } = useTheme()

  // Mock contacts data
  const contacts: Contact[] = [
    { id: '1', name: 'Alice', status: 'online' },
    { id: '2', name: 'Bob', status: 'offline' },
    { id: '3', name: 'Charlie', status: 'online' },
    { id: '4', name: 'David', status: 'offline' },
    { id: '5', name: 'Eve', status: 'online' },
  ];

  const handleContactClick = (contactId: string, event: React.MouseEvent) => {
    onSelectContact(contactId)
    const rect = event.currentTarget.getBoundingClientRect()
    setMissilePosition({ x: rect.left, y: rect.top })
    setTimeout(() => setMissilePosition(null), 5000) // Remove missile after 5 seconds
  }

  const LetterAvatar: React.FC<{ name: string }> = ({ name }) => {
    const initial = name.charAt(0).toUpperCase()
    return (
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
        <span className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>{initial}</span>
      </div>
    )
  }

  return (
    <div className="h-full relative">
      <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <input
          type="text"
          placeholder="Search contacts..."
          className={`w-full p-2 rounded-md ${
            theme === 'dark' 
              ? 'bg-gray-700 text-gray-100 placeholder-gray-400' 
              : 'bg-white text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className={`flex items-center p-4 ${
              theme === 'dark' 
                ? 'hover:bg-gray-700 cursor-pointer' 
                : 'hover:bg-gray-300 cursor-pointer'
            }`}
            onClick={(e) => handleContactClick(contact.id, e)}
          >
            <LetterAvatar name={contact.name} />
            <div className="ml-3">
              <p className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{contact.name}</p>
              <p className={`text-sm ${contact.status === 'online' ? 'text-green-400' : 'text-gray-500'}`}>
                {contact.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {missilePosition && (
        <Missile 
          style={{
            position: 'fixed',
            left: `${missilePosition.x}px`,
            top: `${missilePosition.y}px`,
          }}
        />
      )}
    </div>
  )
}

export default ContactList
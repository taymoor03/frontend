import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar } from './ui/avatar';
import { 
  ArrowLeft,
  Send,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  Euro,
  Calendar,
  MapPin
} from 'lucide-react';
import { Screen } from '../App';

interface ChatScreenProps {
  navigateTo: (screen: Screen) => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  read: boolean;
}

const messages: Message[] = [
  {
    id: 1,
    text: 'Hallo! Ich bin interessiert an Ihrem Umzugsjob.',
    sender: 'other',
    timestamp: '10:30',
    read: true
  },
  {
    id: 2, 
    text: 'Hi Maria! Schön, dass Sie sich gemeldet haben. Haben Sie Erfahrung mit Umzügen?',
    sender: 'me',
    timestamp: '10:32',
    read: true
  },
  {
    id: 3,
    text: 'Ja, ich habe bereits über 20 Umzüge geholfen. Kann ich fragen, was genau transportiert werden muss?',
    sender: 'other', 
    timestamp: '10:35',
    read: true
  },
  {
    id: 4,
    text: 'Das ist super! Es sind hauptsächlich Möbel und ca. 30 Kartons. Haben Sie am Samstag ab 9 Uhr Zeit?',
    sender: 'me',
    timestamp: '10:37',
    read: true
  },
  {
    id: 5,
    text: 'Ja, das passt perfekt! Wie viele Helfer werden gebraucht?',
    sender: 'other',
    timestamp: '10:40',
    read: false
  }
];

export function ChatScreen({ navigateTo }: ChatScreenProps) {
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);

  const contact = {
    name: 'Maria Schmidt',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face',
    online: true,
    lastSeen: 'Zuletzt aktiv vor 2 Min.'
  };

  const jobInfo = {
    title: 'Hilfe beim Umzug (2-Zimmer Wohnung)',
    budget: '80-120€',
    date: '5. September 2025',
    location: 'München, Maxvorstadt'
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: chatMessages.length + 1,
        text: newMessage.trim(),
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('de-DE', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        read: false
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateTo('home')}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <Avatar className="h-10 w-10">
              <img src={contact.avatar} alt={contact.name} className="rounded-full" />
            </Avatar>
            
            <div>
              <h1 className="font-medium text-gray-900">{contact.name}</h1>
              <p className="text-sm text-gray-500">
                {contact.online ? 'Online' : contact.lastSeen}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Job Info */}
      <div className="bg-blue-50 border-b border-blue-100 p-4">
        <div className="bg-white rounded-xl p-3 space-y-2">
          <h3 className="font-medium text-sm">{jobInfo.title}</h3>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Euro className="w-3 h-3" />
                <span>{jobInfo.budget}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{jobInfo.date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{jobInfo.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className="max-w-xs lg:max-w-md">
              {message.sender === 'other' && (
                <div className="flex items-end space-x-2">
                  <Avatar className="h-8 w-8">
                    <img src={contact.avatar} alt={contact.name} className="rounded-full" />
                  </Avatar>
                  <div
                    className="bg-white rounded-2xl rounded-bl-md px-4 py-2 shadow-sm"
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              )}
              
              {message.sender === 'me' && (
                <div
                  className="bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-2"
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              )}
              
              <div className={`flex items-center mt-1 space-x-1 text-xs text-gray-500 ${
                message.sender === 'me' ? 'justify-end' : 'justify-start'
              }`}>
                <span>{message.timestamp}</span>
                {message.sender === 'me' && (
                  <CheckCheck 
                    className={`w-3 h-3 ${
                      message.read ? 'text-blue-600' : 'text-gray-400'
                    }`} 
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-t border-gray-100 p-4">
        <div className="flex space-x-2 mb-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full"
            onClick={() => navigateTo('payment')}
          >
            Job annehmen
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full"
            onClick={() => navigateTo('jobDetails')}
          >
            Job Details
          </Button>
        </div>

        {/* Message Input */}
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Nachricht schreiben..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 rounded-full border-gray-200 focus:border-blue-400"
          />
          <Button 
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="rounded-full w-10 h-10 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
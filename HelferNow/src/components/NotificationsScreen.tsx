import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft,
  Bell,
  MessageCircle,
  Euro,
  Star,
  CheckCircle,
  AlertCircle,
  Settings,
  Trash2,
  Check
} from 'lucide-react';
import { Screen } from '../App';

interface NotificationsScreenProps {
  navigateTo: (screen: Screen) => void;
}

interface Notification {
  id: number;
  type: 'message' | 'payment' | 'review' | 'job' | 'verification';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionButton?: {
    text: string;
    action: () => void;
  };
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'message',
    title: 'Neue Nachricht von Maria Schmidt',
    description: 'Ja, das passt perfekt! Wie viele Helfer werden gebraucht?',
    timestamp: '5 Min',
    read: false,
    actionButton: {
      text: 'Antworten',
      action: () => {}
    }
  },
  {
    id: 2,
    type: 'job',
    title: 'Neue Bewerbung auf deinen Job',
    description: 'Thomas Weber hat sich auf "Hilfe beim Umzug" beworben.',
    timestamp: '1 Std',
    read: false,
    actionButton: {
      text: 'Ansehen',
      action: () => {}
    }
  },
  {
    id: 3,
    type: 'payment',
    title: 'Zahlung erhalten',
    description: 'Du hast 120€ für den abgeschlossenen Job erhalten.',
    timestamp: '3 Std',
    read: true
  },
  {
    id: 4,
    type: 'review',
    title: 'Neue Bewertung erhalten',
    description: 'Anna K. hat dir 5 Sterne gegeben: "Sehr hilfsbereit und pünktlich!"',
    timestamp: '1 Tag',
    read: true,
    actionButton: {
      text: 'Bewertung ansehen',
      action: () => {}
    }
  },
  {
    id: 5,
    type: 'verification',
    title: 'Telefonnummer verifiziert',
    description: 'Deine Telefonnummer wurde erfolgreich bestätigt.',
    timestamp: '2 Tage',
    read: true
  },
  {
    id: 6,
    type: 'job',
    title: 'Job-Erinnerung',
    description: 'Dein Job "Babysitting am Samstag" beginnt morgen um 19:00.',
    timestamp: '2 Tage',
    read: true,
    actionButton: {
      text: 'Details',
      action: () => {}
    }
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'message':
      return <MessageCircle className="w-5 h-5 text-blue-600" />;
    case 'payment':
      return <Euro className="w-5 h-5 text-green-600" />;
    case 'review':
      return <Star className="w-5 h-5 text-yellow-600" />;
    case 'verification':
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case 'job':
      return <AlertCircle className="w-5 h-5 text-purple-600" />;
    default:
      return <Bell className="w-5 h-5 text-gray-600" />;
  }
};

export function NotificationsScreen({ navigateTo }: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

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
            <div>
              <h1 className="text-xl text-gray-800">Mitteilungen</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600">{unreadCount} ungelesene</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={markAllAsRead}
                className="text-blue-600 hover:text-blue-700"
              >
                <Check className="w-4 h-4 mr-1" />
                Alle lesen
              </Button>
            )}
            <Button variant="ghost" size="sm" className="rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4">
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100">
            <TabsTrigger value="all" className="rounded-xl">
              Alle ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="rounded-xl">
              Ungelesen ({unreadCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {activeTab === 'unread' 
                  ? 'Keine ungelesenen Mitteilungen'
                  : 'Keine Mitteilungen vorhanden'
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`p-4 rounded-xl cursor-pointer transition-colors ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`text-sm font-medium ${
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2 ml-2">
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {notification.timestamp}
                        </span>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {notification.description}
                    </p>
                    
                    {notification.actionButton && (
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            notification.actionButton?.action();
                          }}
                          className="rounded-xl"
                        >
                          {notification.actionButton.text}
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="text-red-600 hover:text-red-700 rounded-xl"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white border-t border-gray-100 p-4">
        <Button 
          variant="outline" 
          className="w-full rounded-xl"
        >
          <Settings className="w-4 h-4 mr-2" />
          Benachrichtigungs-Einstellungen
        </Button>
      </div>
    </div>
  );
}
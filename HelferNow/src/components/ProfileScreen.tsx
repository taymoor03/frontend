import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { 
  ArrowLeft,
  Star,
  Shield,
  Phone,
  Mail,
  MapPin,
  Edit,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle,
  Award,
  Clock
} from 'lucide-react';
import { Screen } from '../App';

interface ProfileScreenProps {
  navigateTo: (screen: Screen) => void;
}

export function ProfileScreen({ navigateTo }: ProfileScreenProps) {
  const user = {
    name: 'Max Mustermann',
    email: 'max@beispiel.de',
    phone: '+49 170 1234567',
    location: 'München, Bayern',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviews: 127,
    completedJobs: 89,
    responseTime: '< 1 Std',
    memberSince: 'März 2023',
    verified: {
      phone: true,
      email: true,
      identity: true
    },
    skills: ['Umzugshilfe', 'Möbelmontage', 'Gartenarbeit', 'Hausreparaturen'],
    badges: [
      { name: 'Zuverlässiger Helfer', icon: CheckCircle, color: 'text-green-500' },
      { name: 'Schnelle Antwort', icon: Clock, color: 'text-blue-500' },
      { name: 'Top Bewertungen', icon: Award, color: 'text-yellow-500' }
    ]
  };

  const recentReviews = [
    {
      id: 1,
      rating: 5,
      comment: 'Sehr hilfsbereit und pünktlich! Gerne wieder.',
      reviewer: 'Anna K.',
      date: '15.08.2025',
      job: 'Umzugshilfe'
    },
    {
      id: 2,
      rating: 5,
      comment: 'Professionelle Arbeit, sehr zufrieden.',
      reviewer: 'Thomas M.',
      date: '10.08.2025',
      job: 'Möbelmontage'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigateTo('home')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl text-gray-800">Profil</h1>
          <Button variant="ghost" size="sm" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Profile Header */}
        <Card className="p-6 rounded-xl">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-20 w-20">
              <img src={user.avatar} alt={user.name} className="rounded-full" />
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h2 className="text-xl font-medium">{user.name}</h2>
                {user.verified.identity && (
                  <Shield className="w-5 h-5 text-green-500" />
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{user.rating} ({user.reviews} Bewertungen)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">Mitglied seit {user.memberSince}</p>
            </div>
          </div>

          <Button className="w-full rounded-xl">
            <Edit className="w-4 h-4 mr-2" />
            Profil bearbeiten
          </Button>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 rounded-xl text-center">
            <div className="text-2xl font-medium text-blue-600 mb-1">{user.completedJobs}</div>
            <div className="text-sm text-gray-600">Jobs erledigt</div>
          </Card>
          <Card className="p-4 rounded-xl text-center">
            <div className="text-2xl font-medium text-green-600 mb-1">{user.rating}</div>
            <div className="text-sm text-gray-600">Bewertung</div>
          </Card>
          <Card className="p-4 rounded-xl text-center">
            <div className="text-2xl font-medium text-purple-600 mb-1">{user.responseTime}</div>
            <div className="text-sm text-gray-600">Antwortzeit</div>
          </Card>
        </div>

        {/* Verifications */}
        <Card className="p-4 rounded-xl">
          <h3 className="font-medium mb-3">Verifikationen</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span>Telefonnummer</span>
              </div>
              {user.verified.phone ? (
                <Badge className="bg-green-100 text-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verifiziert
                </Badge>
              ) : (
                <Badge variant="outline">Nicht verifiziert</Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span>E-Mail-Adresse</span>
              </div>
              {user.verified.email ? (
                <Badge className="bg-green-100 text-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verifiziert
                </Badge>
              ) : (
                <Badge variant="outline">Nicht verifiziert</Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <span>Identität</span>
              </div>
              {user.verified.identity ? (
                <Badge className="bg-green-100 text-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verifiziert
                </Badge>
              ) : (
                <Badge variant="outline">Nicht verifiziert</Badge>
              )}
            </div>
          </div>
        </Card>

        {/* Skills */}
        <Card className="p-4 rounded-xl">
          <h3 className="font-medium mb-3">Fähigkeiten</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="rounded-full">
                {skill}
              </Badge>
            ))}
            <Button variant="outline" size="sm" className="rounded-full">
              <Edit className="w-3 h-3 mr-1" />
              Bearbeiten
            </Button>
          </div>
        </Card>

        {/* Badges */}
        <Card className="p-4 rounded-xl">
          <h3 className="font-medium mb-3">Auszeichnungen</h3>
          <div className="space-y-3">
            {user.badges.map((badge, index) => (
              <div key={index} className="flex items-center space-x-3">
                <badge.icon className={`w-5 h-5 ${badge.color}`} />
                <span>{badge.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Reviews */}
        <Card className="p-4 rounded-xl">
          <h3 className="font-medium mb-3">Neueste Bewertungen</h3>
          <div className="space-y-4">
            {recentReviews.map((review) => (
              <div key={review.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{review.reviewer}</span>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-sm text-gray-700">"{review.comment}"</p>
                <p className="text-xs text-gray-500">Job: {review.job}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-3 rounded-xl">
            Alle Bewertungen anzeigen
          </Button>
        </Card>

        {/* Settings */}
        <Card className="p-4 rounded-xl">
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start rounded-xl">
              <HelpCircle className="w-5 h-5 mr-3" />
              Hilfe & Support
            </Button>
            <Button variant="ghost" className="w-full justify-start rounded-xl text-red-600 hover:text-red-700">
              <LogOut className="w-5 h-5 mr-3" />
              Abmelden
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
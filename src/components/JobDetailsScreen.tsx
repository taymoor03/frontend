import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { 
  ArrowLeft,
  MapPin, 
  Euro, 
  Calendar, 
  Clock,
  Star,
  MessageCircle,
  Heart,
  Share2,
  Shield,
  CheckCircle,
  Truck,
  User
} from 'lucide-react';
import { Screen } from '../App';

interface JobDetailsScreenProps {
  navigateTo: (screen: Screen) => void;
  selectedJobId: string | null;
}

export function JobDetailsScreen({ navigateTo, selectedJobId }: JobDetailsScreenProps) {
  // Mock job data - in real app would fetch by selectedJobId
  const job = {
    id: '1',
    title: 'Hilfe beim Umzug (2-Zimmer Wohnung)',
    category: 'Umzug',
    location: 'München, Maxvorstadt',
    fullAddress: 'Augustenstraße 45, 80333 München',
    budget: '80-120',
    date: '2025-09-05',
    time: '09:00',
    duration: '4-6 Stunden',
    description: 'Suche 2-3 Helfer für Umzug einer 2-Zimmer Wohnung. Kisten sind bereits gepackt, es müssen hauptsächlich Möbel und Kartons transportiert werden. Die neue Wohnung ist nur 5km entfernt. Transporter ist bereits organisiert.',
    requirements: [
      'Körperlich fit',
      'Pünktlich und zuverlässig', 
      'Erfahrung beim Möbeltransport von Vorteil'
    ],
    urgent: true,
    postedBy: {
      name: 'Maria Schmidt',
      rating: 4.8,
      reviews: 24,
      verified: true,
      memberSince: '2023',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigateTo('home')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="rounded-full">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h1 className="text-xl text-gray-900 flex-1 pr-2">{job.title}</h1>
            {job.urgent && (
              <Badge className="bg-red-100 text-red-600 border-red-200">
                Eilig
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-gray-600">{job.category}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Key Info */}
        <Card className="p-4 rounded-xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-600">
                <Euro className="w-4 h-4" />
                <span className="text-sm">Budget</span>
              </div>
              <p className="font-medium">{job.budget}€ /Std</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Datum</span>
              </div>
              <p className="font-medium">{new Date(job.date).toLocaleDateString('de-DE')}</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Zeit</span>
              </div>
              <p className="font-medium">{job.time} Uhr</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Dauer</span>
              </div>
              <p className="font-medium">{job.duration}</p>
            </div>
          </div>
        </Card>

        {/* Location */}
        <Card className="p-4 rounded-xl">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h3 className="font-medium">Standort</h3>
            </div>
            <p className="text-gray-600">{job.fullAddress}</p>
            <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
              <p className="text-gray-500">Karte</p>
            </div>
          </div>
        </Card>

        {/* Description */}
        <Card className="p-4 rounded-xl">
          <div className="space-y-3">
            <h3 className="font-medium">Beschreibung</h3>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </div>
        </Card>

        {/* Requirements */}
        <Card className="p-4 rounded-xl">
          <div className="space-y-3">
            <h3 className="font-medium">Anforderungen</h3>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Posted By */}
        <Card className="p-4 rounded-xl">
          <div className="space-y-3">
            <h3 className="font-medium">Auftraggeber</h3>
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <img src={job.postedBy.avatar} alt={job.postedBy.name} className="rounded-full" />
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{job.postedBy.name}</h4>
                  {job.postedBy.verified && (
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600">Verifiziert</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{job.postedBy.rating} ({job.postedBy.reviews} Bewertungen)</span>
                  </div>
                  <span>Mitglied seit {job.postedBy.memberSince}</span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full rounded-xl"
              onClick={() => navigateTo('profile')}
            >
              <User className="w-4 h-4 mr-2" />
              Profil anzeigen
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white border-t border-gray-100 p-4 space-y-3">
        <Button 
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white h-12 rounded-xl shadow-lg"
          onClick={() => navigateTo('chat')}
        >
          Jetzt bewerben
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full h-12 rounded-xl border-gray-200"
          onClick={() => navigateTo('chat')}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Nachricht senden
        </Button>
      </div>
    </div>
  );
}
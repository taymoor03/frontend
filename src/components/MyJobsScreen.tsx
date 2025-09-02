import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft,
  MessageCircle,
  Euro,
  MapPin,
  Calendar,
  Clock,
  Users,
  Eye,
  Truck,
  Sparkles,
  Star
} from 'lucide-react';
import { Screen } from '../App';

interface MyJobsScreenProps {
  navigateTo: (screen: Screen) => void;
}

const postedJobs = [
  {
    id: 1,
    title: 'Hilfe beim Umzug (2-Zimmer Wohnung)',
    category: 'Umzug',
    status: 'active',
    applications: 8,
    budget: '80-120€',
    location: 'München, Maxvorstadt',
    date: '2025-09-05',
    postedDate: '2025-08-28'
  },
  {
    id: 2,
    title: 'Wöchentliche Wohnungsreinigung',
    category: 'Putzen', 
    status: 'completed',
    applications: 12,
    budget: '60€',
    location: 'München, Schwabing',
    date: '2025-08-30',
    postedDate: '2025-08-25',
    helper: 'Maria Schmidt'
  }
];

const appliedJobs = [
  {
    id: 3,
    title: 'Gartenarbeit und Hecke schneiden',
    category: 'Handwerk',
    status: 'pending',
    budget: '25€/Std',
    location: 'München, Bogenhausen',
    date: '2025-09-10',
    appliedDate: '2025-08-29',
    employer: 'Thomas Weber'
  },
  {
    id: 4,
    title: 'Babysitting am Samstag',
    category: 'Babysitten',
    status: 'accepted',
    budget: '15€/Std', 
    location: 'München, Sendling',
    date: '2025-09-07',
    appliedDate: '2025-08-27',
    employer: 'Lisa Müller'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-blue-100 text-blue-600';
    case 'completed':
      return 'bg-green-100 text-green-600';
    case 'pending':
      return 'bg-yellow-100 text-yellow-600';
    case 'accepted':
      return 'bg-green-100 text-green-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'Aktiv';
    case 'completed':
      return 'Abgeschlossen';
    case 'pending':
      return 'Ausstehend';
    case 'accepted':
      return 'Angenommen';
    default:
      return status;
  }
};

export function MyJobsScreen({ navigateTo }: MyJobsScreenProps) {
  const [activeTab, setActiveTab] = useState('posted');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigateTo('home')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl text-gray-800">Meine Jobs</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 rounded-xl">
            <TabsTrigger value="posted" className="rounded-xl">
              Ich habe gepostet ({postedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="applied" className="rounded-xl">
              Ich habe beworben ({appliedJobs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posted" className="space-y-3">
            {postedJobs.map((job) => (
              <Card key={job.id} className="p-4 rounded-xl hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-gray-900 flex-1 pr-2">{job.title}</h3>
                    <Badge className={getStatusColor(job.status)}>
                      {getStatusText(job.status)}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {job.category === 'Umzug' && <Truck className="w-4 h-4" />}
                    {job.category === 'Putzen' && <Sparkles className="w-4 h-4" />}
                    <span>{job.category}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Euro className="w-4 h-4" />
                        <span>{job.budget}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(job.date).toLocaleDateString('de-DE')}</span>
                    </div>
                  </div>

                  {job.status === 'active' && (
                    <div className="flex items-center space-x-1 text-sm text-blue-600">
                      <Users className="w-4 h-4" />
                      <span>{job.applications} Bewerbungen</span>
                    </div>
                  )}

                  {job.status === 'completed' && job.helper && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Erledigt von: <span className="font-medium">{job.helper}</span></span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigateTo('review')}
                        className="rounded-xl"
                      >
                        Bewerten
                      </Button>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 rounded-xl"
                      onClick={() => navigateTo('jobDetails')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                    {job.status === 'active' && (
                      <Button 
                        variant="outline" 
                        className="flex-1 rounded-xl"
                        onClick={() => navigateTo('chat')}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Nachrichten
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="applied" className="space-y-3">
            {appliedJobs.map((job) => (
              <Card key={job.id} className="p-4 rounded-xl hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-gray-900 flex-1 pr-2">{job.title}</h3>
                    <Badge className={getStatusColor(job.status)}>
                      {getStatusText(job.status)}
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-600">
                    Von: <span className="font-medium">{job.employer}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Euro className="w-4 h-4" />
                        <span>{job.budget}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(job.date).toLocaleDateString('de-DE')}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Beworben am: {new Date(job.appliedDate).toLocaleDateString('de-DE')}
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 rounded-xl"
                      onClick={() => navigateTo('jobDetails')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 rounded-xl"
                      onClick={() => navigateTo('chat')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>

                  {job.status === 'accepted' && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-700">Job angenommen! 🎉</span>
                        <Button 
                          size="sm"
                          onClick={() => navigateTo('payment')}
                          className="bg-green-600 hover:bg-green-700 rounded-xl"
                        >
                          Zur Bezahlung
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
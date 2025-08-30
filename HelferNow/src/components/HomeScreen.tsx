import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { 
  Search, 
  Filter, 
  MapPin, 
  Euro, 
  Calendar, 
  Star,
  Bell,
  User,
  Plus,
  List,
  Map as MapIcon,
  Home,
  Briefcase,
  Baby,
  GraduationCap,
  Truck,
  Sparkles,
  Wrench
} from 'lucide-react';
import { Screen } from '../App';

interface HomeScreenProps {
  navigateTo: (screen: Screen, jobId?: string) => void;
}

interface Job {
  id: string;
  title: string;
  category: string;
  location: string;
  budget: string;
  date: string;
  time: string;
  rating: number;
  reviews: number;
  description: string;
  urgent: boolean;
}

const categories = [
  { name: 'Alle', icon: List, color: 'bg-gray-100 text-gray-600' },
  { name: 'Umzug', icon: Truck, color: 'bg-blue-100 text-blue-600' },
  { name: 'Putzen', icon: Sparkles, color: 'bg-purple-100 text-purple-600' },
  { name: 'Babysitten', icon: Baby, color: 'bg-pink-100 text-pink-600' },
  { name: 'Nachhilfe', icon: GraduationCap, color: 'bg-green-100 text-green-600' },
  { name: 'Handwerk', icon: Wrench, color: 'bg-orange-100 text-orange-600' },
];

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Hilfe beim Umzug (2-Zimmer Wohnung)',
    category: 'Umzug',
    location: 'München, Maxvorstadt',
    budget: '80-120',
    date: '2025-09-05',
    time: '09:00',
    rating: 4.8,
    reviews: 24,
    description: 'Suche 2-3 Helfer für Umzug einer 2-Zimmer Wohnung. Kisten sind bereits gepackt.',
    urgent: true
  },
  {
    id: '2', 
    title: 'Wöchentliche Reinigung',
    category: 'Putzen',
    location: 'Berlin, Prenzlauer Berg',
    budget: '60-80',
    date: '2025-09-06',
    time: '10:00',
    rating: 4.9,
    reviews: 156,
    description: 'Regelmäßige Hausreinigung für 3-Zimmer Wohnung jeden Freitag.',
    urgent: false
  },
  {
    id: '3',
    title: 'Babysitter für Samstag Abend',
    category: 'Babysitten',
    location: 'Hamburg, Altona',
    budget: '15-20',
    date: '2025-09-07',
    time: '19:00',
    rating: 4.7,
    reviews: 89,
    description: 'Suche liebevolle Betreuung für 2 Kinder (5 und 8 Jahre) für 4-5 Stunden.',
    urgent: false
  },
  {
    id: '4',
    title: 'Mathematik Nachhilfe Gymnasium',
    category: 'Nachhilfe',
    location: 'Köln, Deutz',
    budget: '25-35',
    date: '2025-09-08',
    time: '16:00',
    rating: 4.6,
    reviews: 43,
    description: 'Mathematik Nachhilfe für Klasse 10 Gymnasium. 2x pro Woche.',
    urgent: false
  },
];

export function HomeScreen({ navigateTo }: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [jobs] = useState<Job[]>(mockJobs);

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === 'Alle' || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.icon : Briefcase;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-gray-800">HelferNow</h1>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigateTo('notifications')}
              className="rounded-full relative"
            >
              <Bell className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateTo('profile')}
              className="rounded-full"
            >
              <User className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Nach Aufgaben oder Orten suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400"
          />
        </div>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "ghost"}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex-shrink-0 rounded-full px-4 h-10 space-x-2 ${
                selectedCategory === category.name 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : category.color
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Filter & View Toggle */}
        <div className="flex items-center justify-between">
          <Button variant="outline" className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('map')}
              className="rounded-none"
            >
              <MapIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredJobs.map((job) => {
              const CategoryIcon = getCategoryIcon(job.category);
              return (
                <Card 
                  key={job.id} 
                  className="p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer rounded-xl"
                  onClick={() => navigateTo('jobDetails', job.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${categories.find(cat => cat.name === job.category)?.color || 'bg-gray-100'}`}>
                      <CategoryIcon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900 line-clamp-2">{job.title}</h3>
                        {job.urgent && (
                          <Badge className="bg-red-100 text-red-600 border-red-200">
                            Eilig
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Euro className="w-4 h-4" />
                            <span>{job.budget}€</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(job.date).toLocaleDateString('de-DE')} um {job.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{job.rating} ({job.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapIcon className="w-12 h-12 mx-auto mb-2" />
              <p>Kartenansicht</p>
              <p className="text-sm">Zeigt {filteredJobs.length} Aufgaben in der Nähe</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-100 px-4 py-2">
        <div className="flex justify-around">
          <Button variant="ghost" className="flex-1 flex flex-col items-center py-2 text-blue-600">
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs">Startseite</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1 flex flex-col items-center py-2 text-gray-600"
            onClick={() => navigateTo('myJobs')}
          >
            <Briefcase className="w-5 h-5 mb-1" />
            <span className="text-xs">Meine Jobs</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1 flex flex-col items-center py-2 text-gray-600"
            onClick={() => navigateTo('postJob')}
          >
            <Plus className="w-5 h-5 mb-1" />
            <span className="text-xs">Job posten</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1 flex flex-col items-center py-2 text-gray-600"
            onClick={() => navigateTo('profile')}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">Profil</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
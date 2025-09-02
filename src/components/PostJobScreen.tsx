import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { 
  ArrowLeft,
  MapPin, 
  Euro, 
  Calendar, 
  Clock,
  Truck,
  Sparkles,
  Baby,
  GraduationCap,
  Wrench,
  Camera,
  Plus
} from 'lucide-react';
import { Screen } from '../App';

interface PostJobScreenProps {
  navigateTo: (screen: Screen) => void;
}

const categories = [
  { value: 'umzug', label: 'Umzug', icon: Truck, color: 'bg-blue-100 text-blue-600' },
  { value: 'putzen', label: 'Putzen', icon: Sparkles, color: 'bg-purple-100 text-purple-600' },
  { value: 'babysitten', label: 'Babysitten', icon: Baby, color: 'bg-pink-100 text-pink-600' },
  { value: 'nachhilfe', label: 'Nachhilfe', icon: GraduationCap, color: 'bg-green-100 text-green-600' },
  { value: 'handwerk', label: 'Handwerk', icon: Wrench, color: 'bg-orange-100 text-orange-600' },
];

export function PostJobScreen({ navigateTo }: PostJobScreenProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    budgetType: 'hourly', // hourly or fixed
    location: '',
    date: '',
    time: '',
    duration: '',
    urgent: false
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Mock submission
    navigateTo('home');
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);

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
          <h1 className="text-xl text-gray-800">Job posten</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Title */}
        <Card className="p-4 rounded-xl">
          <div className="space-y-3">
            <Label htmlFor="title">Jobtitel*</Label>
            <Input
              id="title"
              placeholder="z.B. Hilfe beim Umzug meiner 2-Zimmer Wohnung"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              className="h-12 rounded-xl border-gray-200 focus:border-blue-400"
            />
          </div>
        </Card>

        {/* Category */}
        <Card className="p-4 rounded-xl">
          <div className="space-y-3">
            <Label>Kategorie*</Label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={formData.category === category.value ? "default" : "outline"}
                  onClick={() => updateFormData('category', category.value)}
                  className={`h-16 rounded-xl flex flex-col items-center space-y-1 ${
                    formData.category === category.value 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  <span className="text-sm">{category.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Description */}
        <Card className="p-4 rounded-xl">
          <div className="space-y-3">
            <Label htmlFor="description">Beschreibung*</Label>
            <Textarea
              id="description"
              placeholder="Beschreibe deine Aufgabe im Detail. Was genau soll gemacht werden? Welche Erfahrung ist nötig?"
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              rows={4}
              className="rounded-xl border-gray-200 focus:border-blue-400 resize-none"
            />
          </div>
        </Card>

        {/* Budget */}
        <Card className="p-4 rounded-xl">
          <div className="space-y-4">
            <Label>Budget*</Label>
            
            <div className="flex rounded-xl border border-gray-200 overflow-hidden">
              <Button
                variant={formData.budgetType === 'hourly' ? 'default' : 'ghost'}
                onClick={() => updateFormData('budgetType', 'hourly')}
                className="flex-1 rounded-none"
              >
                Pro Stunde
              </Button>
              <Button
                variant={formData.budgetType === 'fixed' ? 'default' : 'ghost'}
                onClick={() => updateFormData('budgetType', 'fixed')}
                className="flex-1 rounded-none"
              >
                Pauschal
              </Button>
            </div>

            <div className="relative">
              <Euro className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="number"
                placeholder={formData.budgetType === 'hourly' ? '15-25' : '100-200'}
                value={formData.budget}
                onChange={(e) => updateFormData('budget', e.target.value)}
                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400"
              />
            </div>
          </div>
        </Card>

        {/* Location */}
        <Card className="p-4 rounded-xl">
          <div className="space-y-3">
            <Label htmlFor="location">Standort*</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="location"
                placeholder="München, Maxvorstadt oder genaue Adresse"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400"
              />
            </div>
          </div>
        </Card>

        {/* Date & Time */}
        <Card className="p-4 rounded-xl">
          <div className="space-y-4">
            <Label>Wann soll die Aufgabe erledigt werden?*</Label>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm text-gray-600">Datum</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateFormData('date', e.target.value)}
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm text-gray-600">Uhrzeit</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => updateFormData('time', e.target.value)}
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm text-gray-600">Geschätzte Dauer</Label>
              <Select onValueChange={(value) => updateFormData('duration', value)}>
                <SelectTrigger className="h-12 rounded-xl border-gray-200">
                  <SelectValue placeholder="Wähle die geschätzte Dauer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2h">1-2 Stunden</SelectItem>
                  <SelectItem value="2-4h">2-4 Stunden</SelectItem>
                  <SelectItem value="4-6h">4-6 Stunden</SelectItem>
                  <SelectItem value="6-8h">6-8 Stunden</SelectItem>
                  <SelectItem value="ganztag">Ganzer Tag</SelectItem>
                  <SelectItem value="mehrere-tage">Mehrere Tage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Photos */}
        <Card className="p-4 rounded-xl">
          <div className="space-y-3">
            <Label>Fotos hinzufügen (optional)</Label>
            <Button 
              variant="outline" 
              className="w-full h-20 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400"
            >
              <div className="flex flex-col items-center space-y-1">
                <Camera className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-600">Fotos hinzufügen</span>
              </div>
            </Button>
          </div>
        </Card>

        {/* Urgent */}
        <Card className="p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Eiliger Job</h3>
              <p className="text-sm text-gray-600">Wird prominenter angezeigt</p>
            </div>
            <Button
              variant={formData.urgent ? "default" : "outline"}
              onClick={() => updateFormData('urgent', !formData.urgent)}
              className="rounded-xl"
            >
              {formData.urgent ? 'Aktiv' : 'Inaktiv'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white border-t border-gray-100 p-4 space-y-3">
        <div className="text-sm text-gray-600 text-center">
          Nach dem Posten können Helfer sich auf deinen Job bewerben
        </div>
        
        <Button 
          onClick={handleSubmit}
          disabled={!formData.title || !formData.category || !formData.description || !formData.budget}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white h-12 rounded-xl shadow-lg disabled:opacity-50"
        >
          Job veröffentlichen
        </Button>
      </div>
    </div>
  );
}
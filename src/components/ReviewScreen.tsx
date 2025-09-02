import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Avatar } from './ui/avatar';
import { 
  ArrowLeft,
  Star,
  CheckCircle,
  ThumbsUp,
  Clock,
  Users,
  Sparkles
} from 'lucide-react';
import { Screen } from '../App';

interface ReviewScreenProps {
  navigateTo: (screen: Screen) => void;
}

export function ReviewScreen({ navigateTo }: ReviewScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [quickRating, setQuickRating] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const helper = {
    name: 'Maria Schmidt',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face',
    completedJob: 'Hilfe beim Umzug (2-Zimmer Wohnung)'
  };

  const quickRatingOptions = [
    'Pünktlich',
    'Freundlich', 
    'Zuverlässig',
    'Sauber gearbeitet',
    'Gute Kommunikation',
    'Empfehlenswert'
  ];

  const toggleQuickRating = (option: string) => {
    setQuickRating(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      navigateTo('home');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-sm">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl text-gray-800">Vielen Dank!</h2>
            <p className="text-gray-600">
              Deine Bewertung wurde erfolgreich übermittelt und hilft anderen Nutzern.
            </p>
          </div>
          
          <div className="flex space-x-1 justify-center">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigateTo('myJobs')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl text-gray-800">Bewertung abgeben</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Helper Info */}
        <Card className="p-4 rounded-xl">
          <div className="flex items-center space-x-4 mb-3">
            <Avatar className="h-16 w-16">
              <img src={helper.avatar} alt={helper.name} className="rounded-full" />
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium text-lg">{helper.name}</h3>
              <p className="text-sm text-gray-600">{helper.completedJob}</p>
            </div>
          </div>
        </Card>

        {/* Rating */}
        <Card className="p-6 rounded-xl">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium">Wie zufrieden warst du?</h3>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  className="p-2 hover:bg-transparent"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </Button>
              ))}
            </div>
            
            <div className="text-center">
              {rating === 0 && <p className="text-gray-500">Wähle deine Bewertung</p>}
              {rating === 1 && <p className="text-red-600">Sehr unzufrieden</p>}
              {rating === 2 && <p className="text-orange-600">Unzufrieden</p>}
              {rating === 3 && <p className="text-yellow-600">Okay</p>}
              {rating === 4 && <p className="text-blue-600">Zufrieden</p>}
              {rating === 5 && <p className="text-green-600">Sehr zufrieden</p>}
            </div>
          </div>
        </Card>

        {/* Quick Rating */}
        {rating > 0 && (
          <Card className="p-4 rounded-xl">
            <h3 className="font-medium mb-3">Was hat besonders gut geklappt?</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickRatingOptions.map((option) => (
                <Button
                  key={option}
                  variant={quickRating.includes(option) ? "default" : "outline"}
                  onClick={() => toggleQuickRating(option)}
                  className="h-auto py-2 px-3 text-sm rounded-xl"
                >
                  {option}
                </Button>
              ))}
            </div>
          </Card>
        )}

        {/* Comment */}
        {rating > 0 && (
          <Card className="p-4 rounded-xl">
            <h3 className="font-medium mb-3">Möchtest du noch etwas hinzufügen?</h3>
            <Textarea
              placeholder="Teile deine Erfahrungen mit anderen Nutzern..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="rounded-xl border-gray-200 focus:border-blue-400 resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Deine Bewertung wird öffentlich angezeigt und hilft anderen Nutzern.
            </p>
          </Card>
        )}

        {/* Review Tips */}
        <Card className="p-4 rounded-xl bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <h4 className="font-medium text-blue-900 mb-2">Bewertungs-Tipps</h4>
              <ul className="text-blue-700 space-y-1">
                <li>• Sei fair und ehrlich in deiner Bewertung</li>
                <li>• Beschreibe konkrete Erfahrungen</li>
                <li>• Denke daran: Deine Bewertung hilft anderen</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Action */}
      <div className="bg-white border-t border-gray-100 p-4">
        <Button 
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white h-12 rounded-xl shadow-lg disabled:opacity-50"
        >
          Bewertung abschicken
        </Button>
      </div>
    </div>
  );
}
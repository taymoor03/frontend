import React from 'react';
import { Button } from './ui/button';
import { Heart, Users, Star } from 'lucide-react';
import { Screen } from '../App';

interface WelcomeScreenProps {
  navigateTo: (screen: Screen) => void;
}

export function WelcomeScreen({ navigateTo }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-6">
      <div className="text-center space-y-8 max-w-sm">
        {/* Logo */}
        <div className="space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl text-gray-800 tracking-tight">HelferNow.de</h1>
          <p className="text-gray-600 text-lg">Finde lokale Helfer für alle deine Aufgaben</p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <Users className="w-5 h-5 text-blue-500" />
            <span>Vertrauenswürdige Helfer in deiner Nähe</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <Star className="w-5 h-5 text-blue-500" />
            <span>Bewertungen von echten Kunden</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            onClick={() => navigateTo('signup')}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-2xl shadow-lg transition-all duration-200"
          >
            Jetzt registrieren
          </Button>
          
          <Button 
            onClick={() => navigateTo('login')}
            variant="outline"
            className="w-full border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 py-3 rounded-2xl transition-all duration-200"
          >
            Bereits registriert? Anmelden
          </Button>
        </div>

        <p className="text-sm text-gray-500 pt-4">
          Umziehen • Putzen • Babysitten • Nachhilfe • und vieles mehr
        </p>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Mail, Lock, Phone, User, Eye, EyeOff } from 'lucide-react';
import { Screen } from '../App';

interface SignUpScreenProps {
  navigateTo: (screen: Screen) => void;
  onLogin: () => void;
}

export function SignUpScreen({ navigateTo, onLogin }: SignUpScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: form, 2: phone verification
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    acceptTerms: false
  });
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Mock verification success
      onLogin();
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex items-center p-4 border-b border-gray-100">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setStep(1)}
            className="mr-2 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl text-gray-800">Telefon verifizieren</h1>
        </div>

        <div className="flex-1 p-6 space-y-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-600">
              Wir haben einen 6-stelligen Code an<br />
              <span className="font-medium">{formData.phone}</span> gesendet
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verifikationscode</Label>
              <Input
                id="code"
                type="text"
                placeholder="000000"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="text-center text-2xl tracking-widest h-16 rounded-xl border-gray-200 focus:border-blue-400"
              />
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={verificationCode.length !== 6}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white h-12 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              Verifizieren
            </Button>

            <Button 
              variant="ghost"
              className="w-full text-blue-600 hover:text-blue-700"
            >
              Code erneut senden
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center p-4 border-b border-gray-100">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigateTo('welcome')}
          className="mr-2 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl text-gray-800">Registrieren</h1>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName">Vorname</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="firstName"
                  placeholder="Max"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nachname</Label>
              <Input
                id="lastName"
                placeholder="Mustermann"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                className="h-12 rounded-xl border-gray-200 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-Mail-Adresse</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="max@beispiel.de"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefonnummer</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="+49 170 1234567"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="pl-10 h-12 rounded-xl border-gray-200 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Sicheres Passwort"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:border-blue-400"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-8 w-8 rounded-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => updateFormData('acceptTerms', checked)}
              className="mt-0.5"
            />
            <Label htmlFor="terms" className="text-sm leading-5 text-gray-600">
              Ich akzeptiere die{' '}
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto underline">
                Nutzungsbedingungen
              </Button>{' '}
              und{' '}
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto underline">
                Datenschutzerklärung
              </Button>
            </Label>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!formData.acceptTerms || !formData.email || !formData.phone || !formData.password}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white h-12 rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            Weiter zur Verifikation
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Bereits registriert?{' '}
            <Button 
              variant="ghost" 
              onClick={() => navigateTo('login')}
              className="text-blue-600 hover:text-blue-700 p-0 h-auto underline"
            >
              Jetzt anmelden
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
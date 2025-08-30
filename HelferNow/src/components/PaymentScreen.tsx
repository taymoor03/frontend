import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { 
  ArrowLeft,
  CreditCard,
  Banknote,
  Shield,
  CheckCircle,
  Info,
  Euro,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';
import { Screen } from '../App';

interface PaymentScreenProps {
  navigateTo: (screen: Screen) => void;
}

export function PaymentScreen({ navigateTo }: PaymentScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [processing, setProcessing] = useState(false);

  const jobDetails = {
    title: 'Hilfe beim Umzug (2-Zimmer Wohnung)',
    helper: 'Maria Schmidt',
    date: '5. September 2025',
    time: '09:00 - 15:00 Uhr',
    duration: '6 Stunden',
    location: 'München, Maxvorstadt',
    hourlyRate: 20,
    hours: 6,
    subtotal: 120,
    serviceFee: 12,
    total: 132
  };

  const handlePayment = () => {
    setProcessing(true);
    // Mock payment processing
    setTimeout(() => {
      navigateTo('review');
    }, 2000);
  };

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
          <h1 className="text-xl text-gray-800">Bezahlung</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Job Summary */}
        <Card className="p-4 rounded-xl">
          <div className="space-y-3">
            <h3 className="font-medium">{jobDetails.title}</h3>
            <div className="text-sm text-gray-600">
              Helfer: <span className="font-medium">{jobDetails.helper}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{jobDetails.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{jobDetails.time}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{jobDetails.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{jobDetails.duration}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Breakdown */}
        <Card className="p-4 rounded-xl">
          <h3 className="font-medium mb-4">Kostenübersicht</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {jobDetails.hours} Stunden × {jobDetails.hourlyRate}€/Std
              </span>
              <span>{jobDetails.subtotal}€</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <div className="flex items-center space-x-1">
                <span className="text-gray-600">Service-Gebühr</span>
                <Info className="w-3 h-3 text-gray-400" />
              </div>
              <span>{jobDetails.serviceFee}€</span>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between font-medium">
                <span>Gesamt</span>
                <span className="text-lg">{jobDetails.total}€</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Commission Split Info */}
        <Card className="p-4 rounded-xl bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <h4 className="font-medium text-blue-900 mb-1">Vergütungsaufteilung</h4>
              <p className="text-blue-700">
                Der Helfer erhält {jobDetails.subtotal}€. Die Service-Gebühr von {jobDetails.serviceFee}€ 
                deckt Plattform-Kosten, Versicherung und Support ab.
              </p>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-4 rounded-xl">
          <h3 className="font-medium mb-4">Zahlungsart wählen</h3>
          
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-xl hover:bg-gray-50">
                <RadioGroupItem value="online" id="online" />
                <CreditCard className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <Label htmlFor="online" className="font-medium">
                    Online Bezahlung
                  </Label>
                  <p className="text-sm text-gray-600">
                    Sicher über Stripe - Kreditkarte, PayPal oder SEPA
                  </p>
                  <Badge className="bg-green-100 text-green-700 mt-1">
                    Empfohlen
                  </Badge>
                </div>
                <Shield className="w-4 h-4 text-green-500" />
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-xl hover:bg-gray-50">
                <RadioGroupItem value="cash" id="cash" />
                <Banknote className="w-5 h-5 text-orange-600" />
                <div className="flex-1">
                  <Label htmlFor="cash" className="font-medium">
                    Barzahlung vor Ort
                  </Label>
                  <p className="text-sm text-gray-600">
                    Direkte Zahlung an den Helfer in bar
                  </p>
                  <p className="text-xs text-orange-600 mt-1">
                    Keine Käuferschutz-Garantie
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {paymentMethod === 'online' && (
          <Card className="p-4 rounded-xl">
            <h4 className="font-medium mb-3">Stripe Connect</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-green-500" />
                <div className="text-sm">
                  <p className="font-medium">Sicher und verschlüsselt</p>
                  <p className="text-gray-600">Deine Zahlungsdaten sind geschützt</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="text-sm">
                  <p className="font-medium">Käuferschutz inklusive</p>
                  <p className="text-gray-600">Rückerstattung bei Problemen</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {paymentMethod === 'cash' && (
          <Card className="p-4 rounded-xl bg-orange-50 border-orange-200">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-orange-600 mt-0.5" />
              <div className="text-sm">
                <h4 className="font-medium text-orange-900 mb-2">Barzahlung Hinweise</h4>
                <ul className="text-orange-700 space-y-1">
                  <li>• Bitte den genauen Betrag ({jobDetails.total}€) bereithalten</li>
                  <li>• Service-Gebühr wird separat über die App abgerechnet</li>
                  <li>• Quittung vom Helfer anfordern</li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Bottom Action */}
      <div className="bg-white border-t border-gray-100 p-4">
        <Button 
          onClick={handlePayment}
          disabled={processing}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white h-12 rounded-xl shadow-lg"
        >
          {processing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Verarbeitung...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              {paymentMethod === 'online' ? (
                <CreditCard className="w-4 h-4" />
              ) : (
                <Banknote className="w-4 h-4" />
              )}
              <span>
                {paymentMethod === 'online' 
                  ? `Jetzt bezahlen - ${jobDetails.total}€`
                  : 'Barzahlung bestätigen'
                }
              </span>
            </div>
          )}
        </Button>
        
        <div className="text-center mt-3">
          <p className="text-xs text-gray-500">
            Mit der Bezahlung stimmst du unseren{' '}
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto underline text-xs">
              AGB
            </Button>{' '}
            zu
          </p>
        </div>
      </div>
    </div>
  );
}
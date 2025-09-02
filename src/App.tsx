import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { HomeScreen } from './components/HomeScreen';
import { JobDetailsScreen } from './components/JobDetailsScreen';
import { PostJobScreen } from './components/PostJobScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { MyJobsScreen } from './components/MyJobsScreen';
import { ChatScreen } from './components/ChatScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { NotificationsScreen } from './components/NotificationsScreen';

export type Screen = 
  | 'welcome' 
  | 'login' 
  | 'signup' 
  | 'home' 
  | 'jobDetails' 
  | 'postJob' 
  | 'profile' 
  | 'myJobs' 
  | 'chat' 
  | 'payment' 
  | 'review'
  | 'notifications';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateTo = (screen: Screen, jobId?: string) => {
    if (jobId) setSelectedJobId(jobId);
    setCurrentScreen(screen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigateTo('home');
  };

  const screenProps = {
    navigateTo,
    selectedJobId,
    isLoggedIn,
    onLogin: handleLogin
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen {...screenProps} />;
      case 'login':
        return <LoginScreen {...screenProps} />;
      case 'signup':
        return <SignUpScreen {...screenProps} />;
      case 'home':
        return <HomeScreen {...screenProps} />;
      case 'jobDetails':
        return <JobDetailsScreen {...screenProps} />;
      case 'postJob':
        return <PostJobScreen {...screenProps} />;
      case 'profile':
        return <ProfileScreen {...screenProps} />;
      case 'myJobs':
        return <MyJobsScreen {...screenProps} />;
      case 'chat':
        return <ChatScreen {...screenProps} />;
      case 'payment':
        return <PaymentScreen {...screenProps} />;
      case 'review':
        return <ReviewScreen {...screenProps} />;
      case 'notifications':
        return <NotificationsScreen {...screenProps} />;
      default:
        return <WelcomeScreen {...screenProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl md:max-w-6xl md:grid md:grid-cols-2 md:gap-8 md:p-8">
        <div className="md:bg-white md:rounded-2xl md:shadow-lg md:overflow-hidden">
          {renderScreen()}
        </div>
        
        {/* Desktop Preview */}
        <div className="hidden md:block">
          <div className="bg-gray-100 rounded-2xl p-6 h-full">
            <h3 className="text-lg mb-4 text-gray-700">Desktop Preview</h3>
            <div className="bg-white rounded-xl shadow-sm p-4 h-5/6 overflow-auto">
              <div className="transform scale-75 origin-top-left w-full h-full">
                {renderScreen()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fingerprint, Hospital, User, UserRound, Shield, Zap, Heart } from 'lucide-react';
import BiometricAuth from '../components/BiometricAuth';
import PatientDashboard from '../components/PatientDashboard';
import StaffPortal from '../components/StaffPortal';
import Header from '../components/Header';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'patient' | 'staff'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'staff' | null>(null);

  const handleBiometricSuccess = (type: 'patient' | 'staff') => {
    setIsAuthenticated(true);
    setUserType(type);
    setCurrentView(type);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setCurrentView('home');
  };

  const features = [
    {
      icon: Fingerprint,
      title: "Advanced Biometric Security",
      description: "State-of-the-art fingerprint and eye recognition technology for instant, secure access to your medical records",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Lightning Fast Access",
      description: "No forms to fill out - your complete medical data loads automatically in seconds",
      color: "green"
    },
    {
      icon: Heart,
      title: "Patient-Centered Design",
      description: "Designed with empathy for patients in distress, featuring calming colors and intuitive navigation",
      color: "purple"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Your medical data is protected with 256-bit encryption and meets all healthcare privacy standards",
      color: "red"
    }
  ];

  const getFeatureColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600", 
      purple: "bg-purple-100 text-purple-600",
      red: "bg-red-100 text-red-600"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header sudah ada tombol login jika diatur di komponen Header */}
      <Header onLogout={handleLogout} isAuthenticated={isAuthenticated} userType={userType} />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'home' && (
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-8 shadow-2xl animate-pulse">
                <Hospital className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">UniCare Portal</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                Experience seamless healthcare access with our advanced biometric authentication system. 
                Your medical data, instantly available when you need it most.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">&lt; 3s</div>
                  <div className="text-sm text-gray-600">Access Time</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="text-2xl md:text-3xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="text-2xl md:text-3xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="text-2xl md:text-3xl font-bold text-red-600">100%</div>
                  <div className="text-sm text-gray-600">Secure</div>
                </div>
              </div>
            </div>

            {/* Quick Access Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800 mb-2">Patient Access</CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    Quick and secure access to your complete medical records
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <BiometricAuth 
                    onSuccess={() => handleBiometricSuccess('patient')}
                    userType="patient"
                    title="Scan to Access Your Records"
                  />
                </CardContent>
              </Card>

              <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <UserRound className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800 mb-2">Staff Portal</CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    Secure staff access to patient management system
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <BiometricAuth 
                    onSuccess={() => handleBiometricSuccess('staff')}
                    userType="staff"
                    title="Staff Authentication"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Features Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border-0 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
                Why Choose UniCare Portal?
              </h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Built with cutting-edge technology and designed with patient care in mind
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                      <div className={`w-16 h-16 ${getFeatureColorClasses(feature.color)} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow duration-300`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Emergency Information */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-red-800 mb-4">Emergency Access</h3>
                <p className="text-red-700 mb-6 max-w-2xl mx-auto">
                  In case of emergency, our system allows authorized medical personnel to access critical patient information immediately, even without biometric authentication.
                </p>
                <Button variant="destructive" size="lg" className="font-semibold">
                  Emergency Protocol Information
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'patient' && isAuthenticated && (
          <PatientDashboard onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'staff' && isAuthenticated && (
          <StaffPortal onBack={() => setCurrentView('home')} />
        )}
      </main>
    </div>
  );
};

export default Index;
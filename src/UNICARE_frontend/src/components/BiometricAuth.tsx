
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Fingerprint, Eye, Shield, CheckCircle } from 'lucide-react';

interface BiometricAuthProps {
  onSuccess: () => void;
  userType: 'patient' | 'staff';
  title: string;
}

const BiometricAuth = ({ onSuccess, userType, title }: BiometricAuthProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanMethod, setScanMethod] = useState<'fingerprint' | 'eye'>('fingerprint');
  const [progress, setProgress] = useState(0);

  const handleScan = () => {
    setIsScanning(true);
    setProgress(0);
    
    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Simulate biometric scanning process
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setScanComplete(true);
      setTimeout(() => {
        setIsScanning(false);
        setScanComplete(false);
        setProgress(0);
        onSuccess();
      }, 1500);
    }, 2500);
  };

  const getScanIcon = () => {
    if (scanMethod === 'fingerprint') {
      return <Fingerprint className={`w-16 h-16 mx-auto mb-3 transition-all duration-300 ${
        isScanning 
          ? 'text-white animate-pulse' 
          : scanComplete 
            ? 'text-white'
            : 'text-gray-400'
      }`} />;
    } else {
      return <Eye className={`w-16 h-16 mx-auto mb-3 transition-all duration-300 ${
        isScanning 
          ? 'text-white animate-pulse' 
          : scanComplete 
            ? 'text-white'
            : 'text-gray-400'
      }`} />;
    }
  };

  const getScanText = () => {
    if (isScanning) {
      return `Scanning ${scanMethod}... ${progress}%`;
    } else if (scanComplete) {
      return 'Authentication Successful!';
    } else {
      return `Touch for ${scanMethod} scan`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700 mb-6">{title}</p>
        
        {/* Scan Method Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <button
              onClick={() => setScanMethod('fingerprint')}
              className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                scanMethod === 'fingerprint' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              disabled={isScanning}
            >
              <Fingerprint className="w-4 h-4" />
              <span>Fingerprint</span>
            </button>
            <button
              onClick={() => setScanMethod('eye')}
              className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
                scanMethod === 'eye' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              disabled={isScanning}
            >
              <Eye className="w-4 h-4" />
              <span>Eye Scan</span>
            </button>
          </div>
        </div>
        
        <div className="relative inline-block">
          <Card className={`w-48 h-48 mx-auto transition-all duration-500 transform ${
            isScanning 
              ? 'bg-gradient-to-r from-blue-400 to-green-400 shadow-2xl scale-110 rotate-1' 
              : scanComplete 
                ? 'bg-gradient-to-r from-green-400 to-green-500 shadow-2xl scale-110'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-50 hover:to-green-50 hover:shadow-lg cursor-pointer hover:scale-105'
          }`}>
            <CardContent className="flex items-center justify-center h-full relative overflow-hidden">
              <div className="text-center z-10">
                {scanComplete ? (
                  <CheckCircle className="w-16 h-16 mx-auto mb-3 text-white animate-bounce" />
                ) : (
                  getScanIcon()
                )}
                <p className={`text-sm font-medium ${
                  isScanning || scanComplete ? 'text-white' : 'text-gray-600'
                }`}>
                  {getScanText()}
                </p>
              </div>
              
              {/* Scanning Animation */}
              {isScanning && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              )}
            </CardContent>
          </Card>
          
          {/* Progress Ring */}
          {isScanning && (
            <div className="absolute inset-0 rounded-lg">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="4"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 90}`}
                  strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                  className="transition-all duration-200"
                  transform="rotate(-90 100 100)"
                />
              </svg>
            </div>
          )}
          
          {/* Security Badge */}
          <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full">
            <Shield className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={handleScan}
          disabled={isScanning || scanComplete}
          className={`px-8 py-3 text-lg font-medium rounded-full transition-all duration-300 ${
            userType === 'patient' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
          } text-white shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {isScanning ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Authenticating...</span>
            </div>
          ) : scanComplete ? (
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Access Granted</span>
            </div>
          ) : (
            `Start ${scanMethod.charAt(0).toUpperCase() + scanMethod.slice(1)} Scan`
          )}
        </Button>
        
        <p className="text-sm text-gray-500 mt-4">
          {scanMethod === 'fingerprint' 
            ? 'Place your finger on the scanner for secure authentication'
            : 'Look into the camera for eye recognition authentication'
          }
        </p>
        
        <div className="flex items-center justify-center space-x-2 mt-3 text-xs text-gray-400">
          <Shield className="w-3 h-3" />
          <span>256-bit encrypted • HIPAA compliant</span>
        </div>
      </div>
    </div>
  );
};

export default BiometricAuth;

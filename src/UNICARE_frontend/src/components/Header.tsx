import { Button } from "@/components/ui/button";
import { Hospital, User, UserRound } from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onLogout: () => void;
  isAuthenticated: boolean;
  userType: 'patient' | 'staff' | null;
}

const Header = ({ onLogout, isAuthenticated, userType }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
            <Hospital className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">UniCare Portal</h1>
            <p className="text-sm text-gray-600">Advanced Healthcare Management</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/home")}
            variant="default"
            className="bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Home
          </Button>
          {isAuthenticated && (
            <>
              <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full">
                {userType === 'patient' ? (
                  <User className="w-4 h-4 text-blue-600" />
                ) : (
                  <UserRound className="w-4 h-4 text-green-600" />
                )}
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {userType} Portal
                </span>
              </div>
              <Button
                onClick={onLogout}
                variant="outline"
                className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
              >
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
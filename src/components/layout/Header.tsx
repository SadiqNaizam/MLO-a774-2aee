import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Menu } from 'lucide-react'; // Icons

// Props could include user info, notification count, etc.
interface HeaderProps {
  userName?: string;
  userAvatarUrl?: string;
  notificationCount?: number;
  onMenuClick?: () => void; // For mobile menu
}

const Header: React.FC<HeaderProps> = ({
  userName,
  userAvatarUrl,
  notificationCount,
  onMenuClick,
}) => {
  console.log("Rendering Header, user:", userName);
  const userInitials = userName ? userName.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side: Logo/Brand and Mobile Menu Button */}
          <div className="flex items-center">
            {onMenuClick && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2"
                onClick={onMenuClick}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            )}
            <Link to="/" className="flex-shrink-0 flex items-center font-bold text-xl text-blue-600">
              {/* Replace with your Logo/Brand Name */}
              FinApp
            </Link>
          </div>

          {/* Center: Navigation Links (Optional, can be in a Sidebar for mobile-first) */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Dashboard</Link>
            <Link to="/savings" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Savings</Link>
            <Link to="/spending" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Spending</Link>
          </nav>

          {/* Right side: Notifications and User Avatar */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount && notificationCount > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500" />
              )}
            </Button>
            <Link to="/profile" aria-label="User profile">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatarUrl} alt={userName || "User"} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile menu placeholder - to be implemented if onMenuClick is provided */}
    </header>
  );
};

export default Header;
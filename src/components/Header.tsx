
import React from "react";
import { Bell, Moon, Sun, HelpCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  username: string;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ username, toggleDarkMode, isDarkMode }) => {
  const { toast } = useToast();
  
  const showNotification = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };

  const showHelp = () => {
    toast({
      title: "User Guide",
      description: "The user guide will open in a new tab.",
    });
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <img 
              src="/lovable-uploads/71a1df74-71bd-42fb-875f-4b1db66c8a03.png" 
              alt="Logo" 
              className="h-8 w-auto"
            />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Atom HR</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={showNotification}
            className="rounded-full"
          >
            <Bell size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={showHelp}
            className="rounded-full"
          >
            <HelpCircle size={20} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center">
                  <span className="text-sm font-medium">{username}</span>
                  <ChevronDown size={16} className="ml-1" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

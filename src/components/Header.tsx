
import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { GoldProvider } from '@/types';
import { Calendar } from 'lucide-react';

interface HeaderProps {
  selectedProvider: GoldProvider;
  onProviderChange: (provider: GoldProvider) => void;
  lastUpdated: string;
}

const Header = ({ selectedProvider, onProviderChange, lastUpdated }: HeaderProps) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString('vi-VN'));
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString('vi-VN'));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <header className="relative z-10 w-full backdrop-blur-md bg-white/50 dark:bg-navy-900/50 shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-gold-700 dark:from-gold-400 dark:to-gold-600">
                Giá Vàng Việt Nam
              </span>
            </h1>
            <p className="text-muted-foreground text-sm flex items-center justify-center md:justify-start mt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Cập nhật lần cuối: {lastUpdated}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-white/80 dark:bg-navy-800/80 backdrop-blur">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">{currentDateTime}</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue={selectedProvider} className="w-full" onValueChange={(value) => onProviderChange(value as GoldProvider)}>
          <TabsList className="grid w-full grid-cols-3 h-14 mb-4 bg-white/50 dark:bg-navy-800/50 backdrop-blur rounded-xl shadow-inner">
            {['SJC', 'DOJI', 'PNJ'].map(provider => (
              <TabsTrigger 
                key={provider}
                value={provider} 
                className={`text-xl font-medium transition-all duration-300 ${
                  selectedProvider === provider 
                    ? 'text-gold-600 dark:text-gold-400 bg-white dark:bg-navy-700/50 shadow-md' 
                    : 'hover:text-gold-500 dark:hover:text-gold-500'
                }`}
              >
                {provider}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};

export default Header;

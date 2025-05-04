
import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { GoldProvider } from '@/types';
import { Calendar, Award } from 'lucide-react';

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

  // Logo URLs for each provider
  const providerLogos: Record<GoldProvider, { logo: string, color: string }> = {
    'SJC': { 
      logo: 'https://www.sjc.com.vn/upload/images/logo/logo.png',
      color: 'from-yellow-500 to-amber-700'
    },
    'DOJI': { 
      logo: 'https://doji.vn/wp-content/uploads/2022/02/logo-1.png',
      color: 'from-blue-600 to-blue-800'
    },
    'PNJ': { 
      logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-PNJ-V.png',
      color: 'from-red-600 to-red-800'
    }
  };
  
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
          <TabsList className="grid w-full grid-cols-3 h-20 mb-4 bg-white/50 dark:bg-navy-800/50 backdrop-blur rounded-xl shadow-inner">
            {['SJC', 'DOJI', 'PNJ'].map(provider => (
              <TabsTrigger 
                key={provider}
                value={provider} 
                className={`text-xl font-medium transition-all duration-300 flex flex-col items-center justify-center gap-2 py-2 ${
                  selectedProvider === provider 
                    ? 'text-gold-600 dark:text-gold-400 bg-white dark:bg-navy-700/50 shadow-md' 
                    : 'hover:text-gold-500 dark:hover:text-gold-500'
                }`}
              >
                <div className="relative w-full flex items-center justify-center">
                  {selectedProvider === provider && (
                    <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br ${providerLogos[provider as GoldProvider].color} rounded-full -z-10 blur-md opacity-60`}></div>
                  )}
                  <div className="h-8 w-auto flex items-center justify-center">
                    <img 
                      src={providerLogos[provider as GoldProvider].logo} 
                      alt={`${provider} Logo`} 
                      className="h-full object-contain max-w-[70px]"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const icon = document.createElement('div');
                          icon.innerHTML = `<span class="flex items-center justify-center"><Award class="h-6 w-6" /></span>`;
                          parent.appendChild(icon);
                        }
                      }}
                    />
                  </div>
                </div>
                <span>{provider}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};

export default Header;

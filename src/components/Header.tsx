
import { useState } from 'react';
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
  
  return (
    <header className="relative z-10 w-full">
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-gold-700">
              Giá Vàng Việt Nam
            </h1>
            <p className="text-muted-foreground text-sm">
              Cập nhật lần cuối: {lastUpdated}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{currentDateTime}</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue={selectedProvider} className="w-full" onValueChange={(value) => onProviderChange(value as GoldProvider)}>
          <TabsList className="grid w-full grid-cols-3 h-12 mb-4">
            <TabsTrigger 
              value="SJC" 
              className={`text-lg font-medium ${selectedProvider === 'SJC' ? 'text-gold-600' : ''}`}
            >
              SJC
            </TabsTrigger>
            <TabsTrigger 
              value="DOJI" 
              className={`text-lg font-medium ${selectedProvider === 'DOJI' ? 'text-gold-600' : ''}`}
            >
              DOJI
            </TabsTrigger>
            <TabsTrigger 
              value="PNJ" 
              className={`text-lg font-medium ${selectedProvider === 'PNJ' ? 'text-gold-600' : ''}`}
            >
              PNJ
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};

export default Header;

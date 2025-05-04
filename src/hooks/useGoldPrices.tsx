
import { useState, useEffect } from 'react';
import { GoldProvider, GoldPrice, HistoricalData } from '@/types';

// Mock data for demonstration purposes
const mockGoldPrices: GoldPrice[] = [
  {
    id: '1',
    provider: 'SJC',
    type: 'Vàng SJC 1L',
    buyPrice: 8120000,
    sellPrice: 8220000,
    unit: 'VND/chỉ',
    timestamp: new Date().toISOString(),
    change: {
      buy: 0.5,
      sell: 0.7,
    },
  },
  {
    id: '2',
    provider: 'SJC',
    type: 'Vàng nhẫn SJC 99.99',
    buyPrice: 8100000,
    sellPrice: 8200000,
    unit: 'VND/chỉ',
    timestamp: new Date().toISOString(),
    change: {
      buy: 0.3,
      sell: 0.4,
    },
  },
  {
    id: '3',
    provider: 'DOJI',
    type: 'Vàng DOJI Hà Nội',
    buyPrice: 8110000,
    sellPrice: 8210000,
    unit: 'VND/chỉ',
    timestamp: new Date().toISOString(),
    change: {
      buy: -0.1,
      sell: 0.2,
    },
  },
  {
    id: '4',
    provider: 'DOJI',
    type: 'Vàng DOJI HCM',
    buyPrice: 8112000,
    sellPrice: 8212000,
    unit: 'VND/chỉ',
    timestamp: new Date().toISOString(),
    change: {
      buy: 0.2,
      sell: 0.3,
    },
  },
  {
    id: '5',
    provider: 'PNJ',
    type: 'Vàng PNJ',
    buyPrice: 8105000,
    sellPrice: 8205000,
    unit: 'VND/chỉ',
    timestamp: new Date().toISOString(),
    change: {
      buy: 0.4,
      sell: 0.5,
    },
  },
  {
    id: '6',
    provider: 'PNJ',
    type: 'Vàng 24K',
    buyPrice: 8100000,
    sellPrice: 8200000,
    unit: 'VND/chỉ',
    timestamp: new Date().toISOString(),
    change: {
      buy: 0.6,
      sell: 0.5,
    },
  },
];

// Generate historical data for demonstration
const generateHistoricalData = (provider: GoldProvider, type: string): HistoricalData => {
  const today = new Date();
  const data: HistoricalData = {
    provider,
    type,
    data: {
      buy: [],
      sell: [],
    },
  };

  // Generate data for the past 30 days
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Base price
    const basePrice = provider === 'SJC' ? 8100000 : 
                      provider === 'DOJI' ? 8110000 : 8105000;
    
    // Add some random variation to create realistic fluctuations
    const buyVariation = Math.random() * 50000 - 20000;
    const sellVariation = Math.random() * 50000 - 10000;
    
    data.data.buy.push({
      date: date.toISOString().split('T')[0],
      price: basePrice + buyVariation,
    });
    
    data.data.sell.push({
      date: date.toISOString().split('T')[0],
      price: basePrice + 100000 + sellVariation,
    });
  }
  
  return data;
};

// Generate historical data for each gold type
const mockHistoricalData: HistoricalData[] = mockGoldPrices.map(
  (price) => generateHistoricalData(price.provider, price.type)
);

export const useGoldPrices = () => {
  const [selectedProvider, setSelectedProvider] = useState<GoldProvider>('SJC');
  const [loading, setLoading] = useState<boolean>(true);
  const [prices, setPrices] = useState<GoldPrice[]>([]);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // Simulate API call
    const fetchData = () => {
      setLoading(true);
      
      // Simulate delay
      setTimeout(() => {
        setPrices(mockGoldPrices);
        setHistoricalData(mockHistoricalData);
        setLastUpdated(new Date().toLocaleString('vi-VN'));
        setLoading(false);
      }, 1000);
    };
    
    fetchData();
    
    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const getProviderPrices = (provider: GoldProvider) => {
    return prices.filter(price => price.provider === provider);
  };

  const getProviderHistoricalData = (provider: GoldProvider) => {
    return historicalData.filter(data => data.provider === provider);
  };

  return {
    loading,
    prices,
    historicalData,
    selectedProvider,
    setSelectedProvider,
    getProviderPrices,
    getProviderHistoricalData,
    lastUpdated,
  };
};

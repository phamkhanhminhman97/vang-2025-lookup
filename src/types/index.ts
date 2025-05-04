
export type GoldProvider = 'PNJ' | 'DOJI' | 'SJC';

export type GoldType = 'Mua vào' | 'Bán ra';

export interface GoldPrice {
  id: string;
  provider: GoldProvider;
  type: string; // e.g., "9999", "999", "Nhẫn 1 chỉ", etc.
  buyPrice: number;
  sellPrice: number;
  unit: string; // e.g., "VND/chỉ", "VND/lượng"
  timestamp: string;
  change: {
    buy: number; // Change percentage
    sell: number; // Change percentage
  };
}

export interface HistoricalPrice {
  date: string;
  price: number;
}

export interface HistoricalData {
  provider: GoldProvider;
  type: string;
  data: {
    buy: HistoricalPrice[];
    sell: HistoricalPrice[];
  };
}

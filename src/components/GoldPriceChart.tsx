
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistoricalData, GoldPrice } from "@/types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface GoldPriceChartProps {
  historicalData: HistoricalData;
  currentPrice: GoldPrice;
}

const GoldPriceChart = ({ historicalData, currentPrice }: GoldPriceChartProps) => {
  const [timeFrame, setTimeFrame] = useState<'7d' | '15d' | '30d'>('7d');
  
  // Process the data based on the selected time frame
  const processChartData = () => {
    const today = new Date();
    let daysToShow = 7;
    
    if (timeFrame === '15d') daysToShow = 15;
    if (timeFrame === '30d') daysToShow = 30;
    
    const buyData = historicalData.data.buy.slice(-daysToShow);
    const sellData = historicalData.data.sell.slice(-daysToShow);
    
    // Combine buy and sell data for the chart
    return buyData.map((item, index) => ({
      date: new Date(item.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
      buyPrice: Math.round(item.price),
      sellPrice: Math.round(sellData[index].price),
    }));
  };
  
  const chartData = processChartData();
  
  // Calculate price range for YAxis domain
  const prices = [
    ...historicalData.data.buy.map(item => item.price),
    ...historicalData.data.sell.map(item => item.price),
  ];
  
  const minPrice = Math.min(...prices) * 0.995; // 0.5% lower than the minimum
  const maxPrice = Math.max(...prices) * 1.005; // 0.5% higher than the maximum
  
  // Format large numbers for the tooltip and axis
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };
  
  return (
    <Card className="glass-card h-full card-hover">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">
          Biểu đồ giá {currentPrice.type}
        </CardTitle>
        <Tabs defaultValue="7d" onValueChange={(value) => setTimeFrame(value as any)}>
          <TabsList className="h-8">
            <TabsTrigger value="7d" className="text-xs px-2">7 ngày</TabsTrigger>
            <TabsTrigger value="15d" className="text-xs px-2">15 ngày</TabsTrigger>
            <TabsTrigger value="30d" className="text-xs px-2">30 ngày</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-1 pt-4 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis 
              domain={[minPrice, maxPrice]} 
              tickFormatter={formatPrice}
              width={80}
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <Tooltip 
              formatter={(value: number) => [formatPrice(value), '']}
              labelFormatter={(label) => `Ngày: ${label}`}
              contentStyle={{ 
                backgroundColor: 'rgba(17, 25, 40, 0.8)', 
                border: 'none', 
                borderRadius: '8px', 
                padding: '10px',
                color: 'white' 
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="buyPrice" 
              name="Mua vào"
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line 
              type="monotone" 
              dataKey="sellPrice" 
              name="Bán ra"
              stroke="#EF4444" 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GoldPriceChart;

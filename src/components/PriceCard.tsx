
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoldPrice } from "@/types";
import { ArrowUp, ArrowDown } from "lucide-react";

interface PriceCardProps {
  price: GoldPrice;
  type: 'buy' | 'sell';
}

const PriceCard = ({ price, type }: PriceCardProps) => {
  const priceValue = type === 'buy' ? price.buyPrice : price.sellPrice;
  const change = type === 'buy' ? price.change.buy : price.change.sell;
  const isPositive = change > 0;
  
  // Format price to Vietnamese currency
  const formattedPrice = new Intl.NumberFormat('vi-VN').format(priceValue);
  
  return (
    <Card className={`glass-card card-hover overflow-hidden ${type === 'buy' ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-red-500'}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">{type === 'buy' ? 'Mua vào' : 'Bán ra'}</span>
          <div className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? (
              <ArrowUp className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDown className="w-4 h-4 mr-1" />
            )}
            {Math.abs(change)}%
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-navy-900 dark:text-gold-400">{formattedPrice}</div>
        <div className="mt-1 text-sm text-muted-foreground">{price.unit}</div>
      </CardContent>
    </Card>
  );
};

export default PriceCard;

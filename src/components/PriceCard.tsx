
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoldPrice } from "@/types";
import { ArrowUp, ArrowDown, Award } from "lucide-react";

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

  // Logo URLs for each provider
  const providerLogos: Record<string, string> = {
    'SJC': 'https://www.sjc.com.vn/upload/images/logo/logo.png',
    'DOJI': 'https://doji.vn/wp-content/uploads/2022/02/logo-1.png',
    'PNJ': 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-PNJ-V.png'
  };
  
  return (
    <Card className={`glass-card card-hover overflow-hidden relative ${type === 'buy' ? 'buy-card' : 'sell-card'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 rounded-lg"></div>
      <div className={`absolute top-0 left-0 w-2 h-full ${type === 'buy' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
      
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className={`text-lg font-bold ${type === 'buy' ? 'text-blue-500' : 'text-red-500'}`}>
            {type === 'buy' ? 'Mua vào' : 'Bán ra'}
          </span>
          <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
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
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 flex-shrink-0">
            <img 
              src={providerLogos[price.provider]} 
              alt={`${price.provider} Logo`} 
              className="h-full w-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const icon = document.createElement('div');
                  icon.innerHTML = '<Award class="h-5 w-5" />';
                  parent.appendChild(icon);
                }
              }}
            />
          </div>
          <div>
            <div className="text-3xl font-bold text-navy-900 dark:text-gold-400 shine-text">{formattedPrice}</div>
            <div className="mt-1 text-sm text-muted-foreground">{price.unit}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCard;

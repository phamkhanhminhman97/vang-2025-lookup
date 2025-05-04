
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoldPrice } from "@/types";
import { ArrowUp, ArrowDown } from "lucide-react";

interface PriceTableProps {
  prices: GoldPrice[];
  provider: string;
}

const PriceTable = ({ prices, provider }: PriceTableProps) => {
  // Format price to Vietnamese currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <Card className="glass-card card-hover overflow-hidden border border-white/30 dark:border-white/10 shadow-lg">
      <CardHeader className="pb-2 border-b border-white/10">
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-gold-700 dark:from-gold-400 dark:to-gold-600">
          Bảng giá vàng {provider}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-white dark:from-navy-800/80 dark:to-navy-700/80">
                <TableHead className="w-[250px] py-4 font-bold">Loại vàng</TableHead>
                <TableHead className="font-bold">Mua vào</TableHead>
                <TableHead className="font-bold">Bán ra</TableHead>
                <TableHead className="text-right font-bold">Đơn vị</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prices.map((price, index) => (
                <TableRow 
                  key={price.id} 
                  className={`hover:bg-gradient-to-r hover:from-gray-50 hover:to-white dark:hover:from-navy-800/50 dark:hover:to-navy-700/50 transition-colors ${
                    index % 2 === 0 ? 'bg-white/50 dark:bg-navy-800/20' : 'bg-gray-50/80 dark:bg-navy-800/40'
                  }`}
                >
                  <TableCell className="font-medium">{price.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="mr-2 font-semibold text-blue-600 dark:text-blue-400">{formatPrice(price.buyPrice)}</span>
                      <span className={`flex items-center justify-center rounded-full w-6 h-6 ${price.change.buy >= 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {price.change.buy >= 0 ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="mr-2 font-semibold text-red-600 dark:text-red-400">{formatPrice(price.sellPrice)}</span>
                      <span className={`flex items-center justify-center rounded-full w-6 h-6 ${price.change.sell >= 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {price.change.sell >= 0 ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm text-gray-500 dark:text-gray-400">{price.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceTable;


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
    <Card className="glass-card card-hover">
      <CardHeader className="pb-2">
        <CardTitle>Bảng giá vàng {provider}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[250px]">Loại vàng</TableHead>
                <TableHead>Mua vào</TableHead>
                <TableHead>Bán ra</TableHead>
                <TableHead className="text-right">Đơn vị</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prices.map((price) => (
                <TableRow key={price.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{price.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="mr-2">{formatPrice(price.buyPrice)}</span>
                      <span className={price.change.buy >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {price.change.buy >= 0 ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="mr-2">{formatPrice(price.sellPrice)}</span>
                      <span className={price.change.sell >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {price.change.sell >= 0 ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{price.unit}</TableCell>
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

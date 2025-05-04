
import { Skeleton } from "@/components/ui/skeleton";
import { useGoldPrices } from "@/hooks/useGoldPrices";
import Header from "@/components/Header";
import PriceCard from "@/components/PriceCard";
import GoldPriceChart from "@/components/GoldPriceChart";
import PriceTable from "@/components/PriceTable";
import Footer from "@/components/Footer";

const Index = () => {
  const { 
    loading, 
    selectedProvider, 
    setSelectedProvider, 
    getProviderPrices, 
    getProviderHistoricalData,
    lastUpdated 
  } = useGoldPrices();
  
  const currentProviderPrices = getProviderPrices(selectedProvider);
  const currentProviderHistoricalData = getProviderHistoricalData(selectedProvider);
  
  // Use the first price for the featured section
  const featuredPrice = currentProviderPrices[0];
  const featuredHistoricalData = currentProviderHistoricalData[0];
  
  return (
    <div className="flex min-h-screen flex-col">
      <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjAxIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyek0zNCAzNGgtMnYtMmgydjJ6TTM2IDMyaC0ydi0yaDJ2MnpNMzQgMzJoLTJ2LTJoMnYyek0zNiAzMGgtMnYtMmgydjJ6TTM0IDMwaC0ydi0yaDJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      {/* Header */}
      <Header 
        selectedProvider={selectedProvider} 
        onProviderChange={setSelectedProvider} 
        lastUpdated={lastUpdated}
      />
      
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          {/* Loading state */}
          {loading ? (
            <div className="space-y-8">
              {/* Featured price skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <Skeleton className="h-10 w-1/2" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                  </div>
                </div>
                <Skeleton className="h-[350px] rounded-xl" />
              </div>
              
              {/* Price table skeleton */}
              <Skeleton className="h-72 rounded-xl" />
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              {/* Featured price */}
              {featuredPrice && featuredHistoricalData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-500 to-gold-700 dark:from-gold-400 dark:to-gold-600">
                        {featuredPrice.type} - {featuredPrice.provider}
                      </span>
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <PriceCard price={featuredPrice} type="buy" />
                      <PriceCard price={featuredPrice} type="sell" />
                    </div>
                  </div>
                  <GoldPriceChart 
                    historicalData={featuredHistoricalData} 
                    currentPrice={featuredPrice}
                  />
                </div>
              )}
              
              {/* Price table */}
              <PriceTable prices={currentProviderPrices} provider={selectedProvider} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

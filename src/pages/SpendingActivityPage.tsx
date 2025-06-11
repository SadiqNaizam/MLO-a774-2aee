import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import SpendingBreakdownChart from '@/components/SpendingBreakdownChart';
import TransactionListItem from '@/components/TransactionListItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const dummyTransactions = [
  { id: "t1", title: "Coffee Shop", category: "Food & Drink", amount: -5.50, date: new Date(2024, 6, 20), type: "expense" as const },
  { id: "t2", title: "Online Course Subscription", category: "Education", amount: -29.99, date: new Date(2024, 6, 18), type: "expense" as const },
  { id: "t3", title: "Birthday Gift Received", category: "Gifts", amount: 50.00, date: new Date(2024, 6, 15), type: "income" as const },
  { id: "t4", title: "Movie Tickets", category: "Entertainment", amount: -24.00, date: new Date(2024, 6, 12), type: "expense" as const },
  { id: "t5", title: "Freelance Gig Payment", category: "Income", amount: 150.00, date: new Date(2024, 6, 10), type: "income" as const },
  { id: "t6", "title": "Groceries", "category": "Essentials", "amount": -45.20, "date": new Date(2024, 5, 28), type: "expense" as const},
  { id: "t7", "title": "Book Purchase", "category": "Education", "amount": -18.75, "date": new Date(2024, 5, 25), type: "expense" as const},
];

const spendingCategoriesData = [
  { name: 'Food & Drink', value: 350 },
  { name: 'Entertainment', value: 220 },
  { name: 'Shopping', value: 180 },
  { name: 'Transport', value: 90 },
  { name: 'Other', value: 120 },
];

const SpendingActivityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [timePeriod, setTimePeriod] = useState("this_month");

  console.log('SpendingActivityPage loaded');

  const filteredTransactions = useMemo(() => {
    return dummyTransactions.filter(tx => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch = tx.title.toLowerCase().includes(lowerSearchTerm) || (tx.category && tx.category.toLowerCase().includes(lowerSearchTerm));
      // Basic time period filtering (can be more sophisticated)
      if (timePeriod === "last_7_days") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return matchesSearch && new Date(tx.date) >= sevenDaysAgo;
      }
      return matchesSearch; // Default "this_month" or "all_time" would need more logic
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchTerm, timePeriod]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userName="Alex Junior" userAvatarUrl="https://placekitten.com/100/100" />
      <main className="flex-grow p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6">Spending Activity</h1>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="all_transactions">All Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SpendingBreakdownChart
                  title="Monthly Spending Breakdown"
                  data={spendingCategoriesData}
                  className="h-[400px]"
                />
              </div>
              <div className="space-y-4">
                 <h3 className="text-lg font-semibold">Filters</h3>
                 <Select value={timePeriod} onValueChange={setTimePeriod}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="this_month">This Month</SelectItem>
                        <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                        <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                        <SelectItem value="all_time">All Time</SelectItem>
                    </SelectContent>
                 </Select>
                 <div className="p-4 border rounded-lg bg-white">
                    <h4 className="font-medium mb-2">Spending Insights</h4>
                    <p className="text-sm text-gray-600">You've spent $250 on Food & Drink this month. This is 15% higher than last month.</p>
                    {/* More insights can be added here */}
                 </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="all_transactions" className="mt-6">
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search transactions by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-1/2"
              />
            </div>
            <ScrollArea className="h-[calc(100vh-300px)] border rounded-lg"> {/* Adjust height */}
              <div className="p-1">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map(tx => (
                    <TransactionListItem
                      key={tx.id}
                      {...tx}
                      onClick={(id) => console.log('View transaction details:', id)}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-10">No transactions found matching your criteria.</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SpendingActivityPage;
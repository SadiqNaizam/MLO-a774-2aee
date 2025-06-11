import React from 'react';
import Header from '@/components/layout/Header';
import SavingsGoalProgressCard from '@/components/SavingsGoalProgressCard';
import TransactionListItem from '@/components/TransactionListItem';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { PlusCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const balanceChartData = [
  { month: "Jan", balance: 1860 }, { month: "Feb", balance: 2050 },
  { month: "Mar", balance: 2370 }, { month: "Apr", balance: 1980 },
  { month: "May", balance: 2500 }, { month: "Jun", balance: 2800 },
];

const chartConfig = {
  balance: { label: "Balance", color: "hsl(var(--chart-1))" },
} satisfies ChartConfig;

const placeholderSavingsGoals = [
  { goalId: "sg1", goalName: "Summer Trip Fund", currentAmount: 750, targetAmount: 1500, icon: <span>🏖️</span> },
  { goalId: "sg2", goalName: "New Laptop", currentAmount: 300, targetAmount: 1200, icon: <span>💻</span> },
];

const placeholderTransactions = [
  { id: "txn1", title: "Pocket Money Received", category: "Income", amount: 50, date: new Date(2024, 6, 15), type: "income" as const },
  { id: "txn2", title: "Game Purchase", category: "Entertainment", amount: -20, date: new Date(2024, 6, 14), type: "expense" as const },
  { id: "txn3", title: "Bookstore", category: "Education", amount: -15, date: new Date(2024, 6, 12), type: "expense" as const },
  { id: "txn4", title: "Allowance Top-up", category: "Income", amount: 25, date: new Date(2024, 6, 10), type: "income" as const },
];

const MainDashboardPage = () => {
  console.log('MainDashboardPage loaded');

  const currentBalance = 1250.75; // Example balance

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userName="Alex Junior" userAvatarUrl="https://placekitten.com/100/100" notificationCount={3} />
      <main className="flex-grow p-4 md:p-6 space-y-6">
        {/* Balance Overview and Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome Back, Alex!</CardTitle>
              <CardDescription>Here's your financial snapshot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold text-blue-600">
                ${currentBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </div>
              <p className="text-sm text-gray-500">Available Balance</p>
              <div className="flex space-x-2">
                <Button asChild><Link to="/savings-goals"><PlusCircle className="mr-2 h-4 w-4" /> New Goal</Link></Button>
                <Button variant="outline" asChild><Link to="/spending-activity">View Spending <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              </div>
            </CardContent>
          </Card>
          <Card>
             <CardHeader>
                <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="mr-2 h-5 w-5 text-green-500" /> Balance Trend
                </CardTitle>
                <CardDescription>Last 6 months</CardDescription>
             </CardHeader>
             <CardContent className="h-[150px] p-0">
                <ChartContainer config={chartConfig} className="w-full h-full">
                    <BarChart accessibilityLayer data={balanceChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                        <XAxis dataKey="month" tickLine={false} tickMargin={8} axisLine={false} fontSize={12} />
                        <YAxis tickLine={false} axisLine={false} fontSize={12} width={50} tickFormatter={(value) => `$${value/1000}k`}/>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="balance" fill="var(--color-balance)" radius={4} />
                    </BarChart>
                </ChartContainer>
             </CardContent>
          </Card>
        </section>

        {/* Savings Goals Summary */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Your Savings Goals</CardTitle>
                <Button variant="ghost" size="sm" asChild><Link to="/savings-goals">View All</Link></Button>
              </div>
              <CardDescription>Keep up the great work on reaching your goals!</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {placeholderSavingsGoals.map(goal => (
                <SavingsGoalProgressCard
                  key={goal.goalId}
                  {...goal}
                  onViewDetails={(id) => console.log('View details for goal:', id)}
                  onContribute={(id) => console.log('Contribute to goal:', id)}
                />
              ))}
              {placeholderSavingsGoals.length === 0 && (
                <p className="text-gray-500 col-span-full text-center py-4">No active savings goals. Start one today!</p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Recent Transactions */}
        <section>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" asChild><Link to="/spending-activity">View All</Link></Button>
              </div>
              <CardDescription>A quick look at your latest activity.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[250px]">
                <div className="space-y-2">
                  {placeholderTransactions.map(tx => (
                    <TransactionListItem
                      key={tx.id}
                      {...tx}
                      onClick={(id) => console.log('View transaction:', id)}
                    />
                  ))}
                  {placeholderTransactions.length === 0 && (
                     <p className="text-gray-500 text-center py-4">No recent transactions.</p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default MainDashboardPage;
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Header from '@/components/layout/Header';
import SavingsGoalProgressCard from '@/components/SavingsGoalProgressCard';
import IllustrationsComponent from '@/components/IllustrationsComponent';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { PlusCircle, Target } from 'lucide-react';
import { toast } from "@/components/ui/use-toast"; // Using shadcn toast

const goalSchema = z.object({
  goalName: z.string().min(3, "Goal name must be at least 3 characters"),
  targetAmount: z.coerce.number().positive("Target amount must be positive"),
  initialContribution: z.coerce.number().min(0).optional(),
});
type GoalFormData = z.infer<typeof goalSchema>;

interface SavingsGoal extends GoalFormData {
  id: string;
  currentAmount: number;
  icon?: React.ReactNode;
}

const SavingsGoalsPage = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>([
    { id: "sg1", goalName: "Dream Bike", targetAmount: 300, currentAmount: 120, icon: <span>🚲</span> },
    { id: "sg2", goalName: "Concert Tickets", targetAmount: 150, currentAmount: 50, icon: <span>🎤</span> },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log('SavingsGoalsPage loaded');

  const form = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: { goalName: "", targetAmount: 100, initialContribution: 0 },
  });

  const onSubmitGoal = (data: GoalFormData) => {
    const newGoal: SavingsGoal = {
      ...data,
      id: `sg${Date.now()}`,
      currentAmount: data.initialContribution || 0,
      icon: <Target className="mr-2 h-5 w-5 text-blue-500" />
    };
    setGoals(prevGoals => [...prevGoals, newGoal]);
    form.reset();
    setIsDialogOpen(false);
    toast({
      title: "Goal Created!",
      description: `Your new goal "${data.goalName}" has been added.`,
      variant: "default",
    });
  };

  const handleContribute = (goalId: string | number) => {
    // Placeholder for contribution logic
    const contributionAmount = parseFloat(prompt("Enter amount to contribute:") || "0");
    if (contributionAmount > 0) {
      setGoals(goals.map(g => g.id === goalId ? {...g, currentAmount: Math.min(g.targetAmount, g.currentAmount + contributionAmount)} : g));
      toast({ title: "Contribution Added!", description: `Successfully contributed $${contributionAmount} to the goal.`});
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header userName="Alex Junior" userAvatarUrl="https://placekitten.com/100/100" />
      <main className="flex-grow p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Savings Goals</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button><PlusCircle className="mr-2 h-5 w-5" /> New Goal</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create a New Savings Goal</DialogTitle>
                <DialogDescription>Let's set up your next financial target.</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitGoal)} className="space-y-4 py-4">
                  <FormField control={form.control} name="goalName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Name</FormLabel>
                      <FormControl><Input placeholder="e.g., New Video Game" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="targetAmount" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Amount ($)</FormLabel>
                      <FormControl><Input type="number" placeholder="100" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="initialContribution" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Contribution ($) (Optional)</FormLabel>
                      <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                      <Slider
                        defaultValue={[field.value || 0]}
                        max={form.watch('targetAmount') || 1000}
                        step={10}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="mt-2"
                      />
                      <FormDescription>Current: ${field.value || 0}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <DialogFooter>
                    <Button type="submit">Create Goal</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {goals.length > 0 ? (
          <ScrollArea className="h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map(goal => (
                <SavingsGoalProgressCard
                  key={goal.id}
                  goalId={goal.id}
                  goalName={goal.goalName}
                  currentAmount={goal.currentAmount}
                  targetAmount={goal.targetAmount}
                  icon={goal.icon}
                  onViewDetails={(id) => console.log('View details for goal:', id)}
                  onContribute={handleContribute}
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="mt-10 text-center">
            <IllustrationsComponent
              imageSrc="https://via.placeholder.com/300x200/E0F2FE/0EA5E9?text=No+Goals+Yet!"
              altText="No savings goals"
              title="No Savings Goals Yet!"
              message="Ready to save for something awesome? Create your first goal!"
              className="max-w-md mx-auto"
            />
            <Button size="lg" className="mt-6" onClick={() => setIsDialogOpen(true)}>
              <PlusCircle className="mr-2 h-5 w-5" /> Create Your First Goal
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SavingsGoalsPage;
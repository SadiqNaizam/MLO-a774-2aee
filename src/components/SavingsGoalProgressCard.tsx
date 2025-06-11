import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target } from 'lucide-react'; // Example icon

interface SavingsGoalProgressCardProps {
  goalId: string | number;
  goalName: string;
  currentAmount: number;
  targetAmount: number;
  icon?: React.ReactNode; // e.g. an emoji or an SVG icon
  onViewDetails?: (goalId: string | number) => void;
  onContribute?: (goalId: string | number) => void;
}

const SavingsGoalProgressCard: React.FC<SavingsGoalProgressCardProps> = ({
  goalId,
  goalName,
  currentAmount,
  targetAmount,
  icon,
  onViewDetails,
  onContribute,
}) => {
  const progressPercentage = targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0;
  console.log(`Rendering SavingsGoalProgressCard: ${goalName}, Progress: ${progressPercentage}%`);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
            <div>
                <CardTitle className="text-lg flex items-center">
                {icon || <Target className="mr-2 h-5 w-5 text-blue-500" />}
                {goalName}
                </CardTitle>
                <CardDescription>
                Target: ${targetAmount.toLocaleString()}
                </CardDescription>
            </div>
            {/* Optional: Actions like edit/delete could go here */}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-baseline text-sm">
          <span className="font-medium text-gray-700">
            Saved: ${currentAmount.toLocaleString()}
          </span>
          <span className="text-gray-500">
            {Math.max(0, targetAmount - currentAmount).toLocaleString()} to go
          </span>
        </div>
        <Progress value={progressPercentage} aria-label={`${goalName} progress`} className="h-3" />
        <div className="text-xs text-gray-500 text-right">
            {Math.round(progressPercentage)}% complete
        </div>
      </CardContent>
      {(onViewDetails || onContribute) && (
        <CardFooter className="flex justify-end space-x-2 pt-0">
          {onViewDetails && (
            <Button variant="outline" size="sm" onClick={() => onViewDetails(goalId)}>
              Details
            </Button>
          )}
          {onContribute && (
            <Button variant="default" size="sm" onClick={() => onContribute(goalId)}>
              Contribute
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default SavingsGoalProgressCard;
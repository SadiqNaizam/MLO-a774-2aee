import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Optional progress for the module
import { BookOpen } from 'lucide-react'; // Example icon

interface LearningModuleCardProps {
  id: string | number;
  title: string;
  description: string;
  imageUrl?: string; // Optional image for the module
  duration?: string; // e.g., "5 min read", "3 lessons"
  progress?: number; // Percentage, 0-100
  onStartOrContinue: (id: string | number) => void;
  tags?: string[];
  className?: string;
}

const LearningModuleCard: React.FC<LearningModuleCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  duration,
  progress,
  onStartOrContinue,
  tags,
  className,
}) => {
  console.log(`Rendering LearningModuleCard: ${title}`);

  return (
    <Card className={cn("flex flex-col overflow-hidden", className)}>
      {imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails to load
          />
        </div>
      )}
      {!imageUrl && (
         <div className="aspect-video w-full bg-gray-100 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-gray-300" />
         </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {duration && <CardDescription className="text-xs">{duration}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">{tag}</span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2 pt-0">
        {typeof progress === 'number' && (
          <div className="w-full">
            <Progress value={progress} aria-label={`${title} progress`} className="h-2" />
            <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
          </div>
        )}
        <Button
            variant={typeof progress === 'number' && progress > 0 && progress < 100 ? "outline" : "default"}
            size="sm"
            className="w-full"
            onClick={() => onStartOrContinue(id)}
        >
          {typeof progress === 'number' && progress === 100 ? 'Review' :
           typeof progress === 'number' && progress > 0 ? 'Continue' : 'Start Learning'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LearningModuleCard;
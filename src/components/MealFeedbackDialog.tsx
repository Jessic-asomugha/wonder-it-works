
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MealFeedbackDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mealName: string;
  mealId: string;
  initialStep?: "options" | "feedback";
  onLogOnly?: () => void;
}

export function MealFeedbackDialog({
  isOpen,
  onClose,
  mealName,
  mealId,
  initialStep = "feedback",
  onLogOnly,
}: MealFeedbackDialogProps) {
  const [step, setStep] = useState<"options" | "feedback">(initialStep);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Please add a rating",
        description: "Select a star rating for this meal.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send data to a backend
    console.log("Submitting feedback:", {
      mealId,
      mealName,
      rating,
      comment,
    });

    // Save to feedback history
    const feedback = {
      id: Date.now(),
      mealName,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    const existingFeedback = localStorage.getItem('feedbackHistory');
    const feedbackHistory = existingFeedback ? JSON.parse(existingFeedback) : [];
    feedbackHistory.unshift(feedback);
    localStorage.setItem('feedbackHistory', JSON.stringify(feedbackHistory));
    
    // Update the logged meal in localStorage to indicate it has feedback
    const savedMeals = localStorage.getItem('loggedMeals');
    if (savedMeals) {
      const meals = JSON.parse(savedMeals);
      const updatedMeals = meals.map((meal: any) => {
        if (meal && meal.id === mealId) {
          return {
            ...meal,
            hasFeedback: true,
            rating,
            comment
          };
        }
        return meal;
      });
      localStorage.setItem('loggedMeals', JSON.stringify(updatedMeals));
    }

    toast({
      title: "Feedback submitted",
      description: `Thanks for rating ${mealName}!`,
    });

    // Reset and close
    setRating(0);
    setComment("");
    resetAndClose();
  };

  const handleProvideNow = () => {
    setStep("feedback");
  };

  const handleLogOnly = () => {
    // Just log the meal without feedback
    console.log("Logged meal without feedback:", {
      mealId,
      mealName,
    });

    toast({
      title: "Meal logged",
      description: `${mealName} has been logged to your diary.`,
      variant: "default",
    });

    if (onLogOnly) {
      onLogOnly();
    }
    
    resetAndClose();
  };

  const handleSkip = () => {
    handleLogOnly();
  };

  const resetAndClose = () => {
    // Reset the component state
    setTimeout(() => {
      setStep(initialStep);
      setRating(0);
      setComment("");
    }, 300);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {step === "options" ? (
          <>
            <DialogHeader>
              <DialogTitle>Log this meal</DialogTitle>
              <DialogDescription>
                Would you like to provide feedback for {mealName}?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 flex flex-col gap-4">
              <Button onClick={handleProvideNow}>
                Provide feedback now
              </Button>
              <Button variant="outline" onClick={handleLogOnly}>
                Log only, I'll provide feedback later
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Rate this meal</DialogTitle>
              <DialogDescription>
                How was {mealName}? Your feedback helps us improve our recommendations.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating ? "text-amber-400 fill-amber-400" : "text-slate-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Comments (optional)</label>
                <Textarea
                  placeholder="Share your thoughts about this meal..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter className="flex gap-2 sm:justify-between">
              <Button variant="outline" onClick={handleSkip}>
                Skip
              </Button>
              <Button onClick={handleSubmit} disabled={rating === 0}>
                Submit Feedback
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

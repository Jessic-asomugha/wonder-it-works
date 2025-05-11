
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
}

export function MealFeedbackDialog({
  isOpen,
  onClose,
  mealName,
  mealId,
}: MealFeedbackDialogProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = () => {
    // In a real app, this would send data to a backend
    console.log("Submitting feedback:", {
      mealId,
      mealName,
      rating,
      comment,
    });

    toast({
      title: "Feedback submitted",
      description: `Thanks for rating ${mealName}!`,
    });

    // Reset and close
    setRating(0);
    setComment("");
    onClose();
  };

  const handleSkip = () => {
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

    // Reset and close
    setRating(0);
    setComment("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
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
      </DialogContent>
    </Dialog>
  );
}

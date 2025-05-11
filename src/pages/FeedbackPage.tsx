
import { useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";

// Mock feedback data - in a real app, this would come from a database
const mockFeedback = [
  {
    id: 1,
    mealName: "Greek Yogurt with Berries",
    rating: 5,
    comment: "Really enjoyed this breakfast. The yogurt was creamy and the berries added just the right amount of sweetness without spiking my blood sugar.",
    date: "2025-05-09"
  },
  {
    id: 2,
    mealName: "Grilled Chicken Salad",
    rating: 4,
    comment: "Tasty and filling. I added some extra olive oil and it was perfect for lunch.",
    date: "2025-05-08"
  },
  {
    id: 3,
    mealName: "Salmon with Steamed Vegetables",
    rating: 5,
    comment: "The salmon was delicious and the vegetables were perfectly cooked. This will be a regular in my meal rotation.",
    date: "2025-05-07"
  },
  {
    id: 4,
    mealName: "Apple with Almond Butter",
    rating: 3,
    comment: "Good snack option but I found the almond butter a bit too thick. Might try a different brand next time.",
    date: "2025-05-06"
  }
];

const FeedbackPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("history");
  const [generalFeedback, setGeneralFeedback] = useState<string>("");

  const handleSubmitFeedback = () => {
    if (generalFeedback.trim().length < 10) {
      toast({
        title: "Feedback too short",
        description: "Please provide more detailed feedback to help us improve.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We appreciate your input.",
    });
    
    setGeneralFeedback("");
  };

  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} 
      />
    ));
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Feedback</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="history">My Feedback</TabsTrigger>
            <TabsTrigger value="new">Share Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Feedback History</h2>
            {mockFeedback.length > 0 ? (
              <div className="space-y-4">
                {mockFeedback.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{item.mealName}</CardTitle>
                          <div className="text-xs text-slate-500 mt-1">{item.date}</div>
                        </div>
                        <div className="flex">
                          {renderStars(item.rating)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">{item.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500">
                <p>You haven't provided any feedback yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="new" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Share Your Thoughts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">How would you rate your overall experience?</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button" 
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star className="w-6 h-6 text-amber-400 hover:fill-amber-400" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your feedback</label>
                    <Textarea
                      placeholder="Tell us what you think about the app, the meal plans, or any suggestions you have..."
                      rows={5}
                      value={generalFeedback}
                      onChange={(e) => setGeneralFeedback(e.target.value)}
                    />
                  </div>

                  <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default FeedbackPage;

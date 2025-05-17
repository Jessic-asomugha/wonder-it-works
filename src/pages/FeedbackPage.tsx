
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface FeedbackItem {
  id: number;
  mealName: string;
  rating: number;
  comment: string;
  date: string;
}

const FeedbackPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("history");
  const [generalFeedback, setGeneralFeedback] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchFeedbackHistory = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, you'd fetch from your feedback table in Supabase
        // This is simulating that with a delay
        setTimeout(() => {
          // For now, use mock data
          // In a real app, this would be:
          // const { data, error } = await supabase.from('meal_feedback').select('*').eq('user_id', user.id);
          const mockData = localStorage.getItem('feedbackHistory');
          const parsedData = mockData ? JSON.parse(mockData) : [];
          setFeedbackHistory(parsedData);
          setIsLoading(false);
        }, 800);
        
      } catch (error) {
        console.error("Error fetching feedback history:", error);
        setIsLoading(false);
      }
    };
    
    fetchFeedbackHistory();
  }, [user]);

  const handleSubmitFeedback = () => {
    if (generalFeedback.trim().length < 10) {
      toast({
        title: "Feedback too short",
        description: "Please provide more detailed feedback to help us improve.",
        variant: "destructive"
      });
      return;
    }
    
    if (rating === 0) {
      toast({
        title: "Please add a rating",
        description: "Select a star rating for your overall experience.",
        variant: "destructive"
      });
      return;
    }

    // In a real implementation, you'd save to your Supabase table
    // For now, we'll save to localStorage to demonstrate the functionality
    const newFeedback: FeedbackItem = {
      id: Date.now(),
      mealName: "Overall Experience",
      rating: rating,
      comment: generalFeedback,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedFeedback = [newFeedback, ...feedbackHistory];
    setFeedbackHistory(updatedFeedback);
    localStorage.setItem('feedbackHistory', JSON.stringify(updatedFeedback));
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We appreciate your input.",
    });
    
    setGeneralFeedback("");
    setRating(0);
    setActiveTab("history");
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
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : feedbackHistory.length > 0 ? (
              <div className="space-y-4">
                {feedbackHistory.map((item) => (
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
                          onClick={() => setRating(star)}
                        >
                          <Star className={`w-6 h-6 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-amber-400'}`} />
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

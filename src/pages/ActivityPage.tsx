
import { MainLayout } from "@/components/MainLayout";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarDays, Star, ArrowUpRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MealFeedbackDialog } from "@/components/MealFeedbackDialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

interface LoggedMeal {
  id: string;
  name: string;
  date: string;
  time: string;
  calories: number;
  hasFeedback: boolean;
  rating?: number;
  comment?: string;
}

interface GlucoseReading {
  id: number | string;
  date: string;
  time: string;
  level: number;
  status: string;
}

const ActivityPage = () => {
  const { user } = useAuth();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState({ id: "", name: "" });
  const [loggedMeals, setLoggedMeals] = useState<LoggedMeal[]>([]);
  const [glucoseReadings, setGlucoseReadings] = useState<GlucoseReading[]>([]);
  const [isLoadingMeals, setIsLoadingMeals] = useState(true);
  const [isLoadingReadings, setIsLoadingReadings] = useState(true);
  
  // Fetch user's meals and glucose readings from Supabase
  useEffect(() => {
    if (!user) return;
    
    const fetchUserActivity = async () => {
      // Mock data for now - will be replaced with actual database calls
      setIsLoadingMeals(true);
      setIsLoadingReadings(true);
      
      try {
        // Fetch user's glucose readings
        const { data: glucoseData, error: glucoseError } = await supabase
          .from('glucose_readings')
          .select('*')
          .eq('user_id', user.id)
          .order('reading_time', { ascending: false });
          
        if (glucoseError) {
          console.error("Error fetching glucose readings:", glucoseError);
        } else {
          // Map the glucose data to the expected format
          const formattedReadings = (glucoseData || []).map(reading => {
            const readingDate = new Date(reading.reading_time);
            return {
              id: reading.id,
              date: readingDate.toISOString().split('T')[0],
              time: readingDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
              level: reading.reading_value,
              status: reading.reading_value > 140 ? "high" : "normal"
            };
          });
          
          setGlucoseReadings(formattedReadings);
        }
        
        // For meals, use localStorage for now until meal logging is fully implemented
        const savedMeals = localStorage.getItem('loggedMeals');
        if (savedMeals) {
          const parsedMeals = JSON.parse(savedMeals);
          setLoggedMeals(parsedMeals.filter((meal: LoggedMeal) => meal !== null));
        }
      } catch (error) {
        console.error("Error fetching user activity data:", error);
      } finally {
        setIsLoadingMeals(false);
        setIsLoadingReadings(false);
      }
    };
    
    fetchUserActivity();
  }, [user]);
  
  const handleProvideFeedback = (mealId: string, mealName: string) => {
    setCurrentMeal({ id: mealId, name: mealName });
    setFeedbackDialogOpen(true);
  };
  
  const handleSubmitFeedback = (rating: number, comment: string) => {
    // Update the meal in localStorage with feedback
    const updatedMeals = loggedMeals.map(meal => {
      if (meal.id === currentMeal.id) {
        return {
          ...meal,
          hasFeedback: true,
          rating,
          comment
        };
      }
      return meal;
    });
    
    setLoggedMeals(updatedMeals);
    localStorage.setItem('loggedMeals', JSON.stringify(updatedMeals));
    
    // Also save to feedbackHistory for the Feedback page
    const feedback = {
      id: Date.now(),
      mealName: currentMeal.name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    
    const existingFeedback = localStorage.getItem('feedbackHistory');
    const feedbackHistory = existingFeedback ? JSON.parse(existingFeedback) : [];
    feedbackHistory.unshift(feedback);
    localStorage.setItem('feedbackHistory', JSON.stringify(feedbackHistory));
    
    setFeedbackDialogOpen(false);
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Activity</h1>
        <p className="text-slate-500 mb-6">View your recent activity and health insights</p>
        
        <Tabs defaultValue="meals" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="meals">Logged Meals</TabsTrigger>
            <TabsTrigger value="glucose">Glucose Readings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="meals" className="mt-6 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Meals</CardTitle>
                <CardDescription>Your logged meals and feedback</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {isLoadingMeals ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : loggedMeals.length > 0 ? (
                  <div className="divide-y">
                    {loggedMeals.map((meal) => (
                      <div key={meal.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <div className="text-base font-medium">{meal.name}</div>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <CalendarDays className="h-3.5 w-3.5" />
                              {meal.date} at {meal.time}
                            </div>
                          </div>
                          <Badge variant={meal.hasFeedback ? "secondary" : "outline"} className="mt-0.5">
                            {meal.calories} cal
                          </Badge>
                        </div>
                        
                        {meal.hasFeedback ? (
                          <div className="mt-2 bg-slate-50 rounded-md p-3">
                            <div className="flex items-center gap-1 mb-1">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <Star 
                                  key={index} 
                                  className={`h-4 w-4 ${index < (meal.rating || 0) ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} 
                                />
                              ))}
                            </div>
                            {meal.comment ? (
                              <p className="text-sm text-slate-600 mt-1">{meal.comment}</p>
                            ) : (
                              <p className="text-sm text-slate-500 italic mt-1">No comment provided</p>
                            )}
                            <Link to="/feedback">
                              <Button variant="ghost" size="sm" className="mt-2 text-xs h-7 px-2">
                                View Feedback
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs"
                              onClick={() => handleProvideFeedback(meal.id, meal.name)}
                            >
                              Provide Feedback
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-slate-500 mb-4">No logged meals yet</p>
                    <Button variant="outline" asChild>
                      <Link to="/meal-detail/new">Log a Meal</Link>
                    </Button>
                  </div>
                )}
                
                {loggedMeals.length > 0 && (
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link to="/meal-detail/new">Log New Meal</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="glucose" className="mt-6 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Glucose Readings</CardTitle>
                <CardDescription>Your recent blood glucose levels</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {isLoadingReadings ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : glucoseReadings.length > 0 ? (
                  <div className="divide-y">
                    {glucoseReadings.slice(0, 5).map((reading) => (
                      <div key={reading.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarDays className="h-3.5 w-3.5 text-slate-500" />
                            {reading.date} at {reading.time}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={reading.status === "normal" ? "secondary" : "destructive"}
                            className="font-medium"
                          >
                            {reading.level} mg/dL
                          </Badge>
                          <span className={`text-xs ${reading.status === "normal" ? "text-green-600" : "text-red-600"}`}>
                            {reading.status === "normal" ? "Normal" : "High"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-slate-500 mb-4">No glucose readings yet</p>
                    <Button variant="outline" asChild>
                      <Link to="/glucose-monitoring">Log Glucose Level</Link>
                    </Button>
                  </div>
                )}
                
                {glucoseReadings.length > 0 && (
                  <>
                    <div className="mt-6 rounded-lg bg-gradient-to-r from-primary/10 to-blue-50 p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <ArrowUpRight className="mr-1 h-4 w-4" /> Health Insight
                      </h4>
                      <p className="text-sm text-slate-600">
                        {glucoseReadings.length > 0 
                          ? `Your average blood glucose level is ${Math.round(glucoseReadings.reduce((acc, r) => acc + r.level, 0) / glucoseReadings.length)} mg/dL.` 
                          : "Start logging your glucose levels to get personalized insights."}
                      </p>
                      <Button variant="outline" size="sm" className="mt-3 bg-white" asChild>
                        <Link to="/analytics">View Detailed Analysis</Link>
                      </Button>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4" asChild>
                      <Link to="/glucose-monitoring">Log New Reading</Link>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <MealFeedbackDialog 
        isOpen={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
        mealId={currentMeal.id}
        mealName={currentMeal.name}
        initialStep="feedback"
        onLogOnly={() => {}}
      />
    </MainLayout>
  );
};

export default ActivityPage;

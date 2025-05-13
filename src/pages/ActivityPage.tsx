
import { MainLayout } from "@/components/MainLayout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarDays, Star, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MealFeedbackDialog } from "@/components/MealFeedbackDialog";

// Mock data for logged meals
const loggedMeals = [
  {
    id: "meal-1",
    name: "Greek Yogurt with Berries",
    date: "2024-05-13",
    time: "8:30 AM",
    calories: 220,
    hasFeedback: true,
    rating: 5,
    comment: "Delicious and filling breakfast. Will have again!"
  },
  {
    id: "meal-2",
    name: "Grilled Chicken Salad",
    date: "2024-05-13",
    time: "12:45 PM",
    calories: 350,
    hasFeedback: false
  },
  {
    id: "meal-3",
    name: "Salmon with Vegetables",
    date: "2024-05-12",
    time: "7:15 PM",
    calories: 420,
    hasFeedback: true,
    rating: 4,
    comment: "Good, but needed more seasoning."
  },
  {
    id: "meal-4",
    name: "Quinoa Bowl",
    date: "2024-05-12",
    time: "1:00 PM",
    calories: 380,
    hasFeedback: true,
    rating: 3,
    comment: ""
  },
  {
    id: "meal-5",
    name: "Omelette with Spinach",
    date: "2024-05-11",
    time: "9:00 AM",
    calories: 290,
    hasFeedback: false
  }
];

// Mock data for glucose readings
const glucoseReadings = [
  { id: 1, date: "2024-05-13", time: "8:00 AM", level: 110, status: "normal" },
  { id: 2, date: "2024-05-13", time: "1:00 PM", level: 125, status: "normal" },
  { id: 3, date: "2024-05-13", time: "7:00 PM", level: 118, status: "normal" },
  { id: 4, date: "2024-05-12", time: "8:30 AM", level: 145, status: "high" },
  { id: 5, date: "2024-05-12", time: "1:30 PM", level: 130, status: "normal" },
  { id: 6, date: "2024-05-12", time: "7:30 PM", level: 128, status: "normal" },
  { id: 7, date: "2024-05-11", time: "8:15 AM", level: 108, status: "normal" },
  { id: 8, date: "2024-05-11", time: "12:45 PM", level: 120, status: "normal" },
  { id: 9, date: "2024-05-11", time: "7:00 PM", level: 115, status: "normal" }
];

const ActivityPage = () => {
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState({ id: "", name: "" });
  
  const handleProvideFeedback = (mealId: string, mealName: string) => {
    setCurrentMeal({ id: mealId, name: mealName });
    setFeedbackDialogOpen(true);
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
                                className={`h-4 w-4 ${index < meal.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} 
                              />
                            ))}
                          </div>
                          {meal.comment ? (
                            <p className="text-sm text-slate-600 mt-1">{meal.comment}</p>
                          ) : (
                            <p className="text-sm text-slate-500 italic mt-1">No comment provided</p>
                          )}
                          <Button variant="ghost" size="sm" className="mt-2 text-xs h-7 px-2">
                            View Feedback
                          </Button>
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
                
                <Button variant="outline" className="w-full mt-4">
                  View All Logged Meals
                </Button>
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
                
                <div className="mt-6 rounded-lg bg-gradient-to-r from-primary/10 to-blue-50 p-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4" /> Health Insight
                  </h4>
                  <p className="text-sm text-slate-600">
                    Your average blood glucose level this week is 121 mg/dL, which is within your target range. 
                    Keep up the good work!
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 bg-white">
                    View Detailed Analysis
                  </Button>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View All Glucose Readings
                </Button>
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
      />
    </MainLayout>
  );
};

export default ActivityPage;

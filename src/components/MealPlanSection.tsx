import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Utensils } from "lucide-react";

interface MealPlanSectionProps {
  userData: {
    name: string;
    age: number;
    height: number;
    weight: number;
    diabetesType: string;
    calorieTarget: number;
    budget: {
      weekly: number;
      currency: string;
    };
  };
}

export const MealPlanSection = ({ userData }: MealPlanSectionProps) => {
  const [planPeriod, setPlanPeriod] = useState("daily");
  
  // Mock meal plan data - in a real app this would come from an API/backend
  const mockMealPlan = {
    daily: [
      {
        mealType: "Breakfast",
        dishes: [
          { name: "Greek yogurt with berries", calories: 220, carbs: 28, proteins: 18, fats: 6 },
          { name: "Whole grain toast", calories: 80, carbs: 15, proteins: 3, fats: 1 }
        ],
        totalCalories: 300
      },
      {
        mealType: "Lunch",
        dishes: [
          { name: "Grilled chicken salad", calories: 350, carbs: 15, proteins: 40, fats: 12 },
          { name: "Quinoa", calories: 120, carbs: 21, proteins: 4, fats: 2 }
        ],
        totalCalories: 470
      },
      {
        mealType: "Dinner",
        dishes: [
          { name: "Salmon with steamed vegetables", calories: 320, carbs: 10, proteins: 30, fats: 18 },
          { name: "Sweet potato", calories: 150, carbs: 35, proteins: 2, fats: 0 }
        ],
        totalCalories: 470
      },
      {
        mealType: "Snacks",
        dishes: [
          { name: "Apple with almond butter", calories: 200, carbs: 25, proteins: 5, fats: 10 },
          { name: "Carrot sticks", calories: 50, carbs: 12, proteins: 1, fats: 0 }
        ],
        totalCalories: 250
      }
    ],
    weekly: [
      // Additional mock data for weekly plan would go here
      // Keeping it simple for now
    ]
  };

  const dailyTotalCalories = mockMealPlan.daily.reduce(
    (sum, meal) => sum + meal.totalCalories, 0
  );

  return (
    <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Meal Plan</CardTitle>
          <div className="flex items-center gap-2">
            <Tabs value={planPeriod} onValueChange={setPlanPeriod}>
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" className="ml-4">Regenerate Plan</Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <TabsContent value="daily" className="space-y-4 mt-0">
            <div className="flex justify-between items-center mb-4 px-2">
              <div>
                <h3 className="text-lg font-medium">Today's Plan</h3>
                <p className="text-sm text-muted-foreground">
                  {dailyTotalCalories} calories • Budget: {userData.budget.currency}{Math.round(userData.budget.weekly / 7)}
                </p>
              </div>
              <Button variant="outline" size="sm" className="flex gap-2">
                <Calendar className="h-4 w-4" />
                <span>Today</span>
              </Button>
            </div>
            
            <div className="space-y-4">
              {mockMealPlan.daily.map((meal, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 bg-muted p-4 flex items-center">
                      <div>
                        <h4 className="font-medium">{meal.mealType}</h4>
                        <p className="text-sm text-muted-foreground">{meal.totalCalories} calories</p>
                      </div>
                    </div>
                    <div className="p-4 flex-1">
                      {meal.dishes.map((dish, dishIndex) => (
                        <div key={dishIndex} className="mb-2 last:mb-0">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Utensils className="h-4 w-4 text-muted-foreground" />
                              <span>{dish.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{dish.calories} cal</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Carbs: {dish.carbs}g • Protein: {dish.proteins}g • Fat: {dish.fats}g
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="weekly" className="mt-0">
            <div className="h-60 flex items-center justify-center border rounded-md">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Weekly Plan</h3>
                <p className="text-muted-foreground mb-4">Generate a full week's meal plan based on your preferences.</p>
                <Button>Generate Weekly Plan</Button>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Budget Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Weekly Budget</span>
              <span className="font-medium">{userData.budget.currency}{userData.budget.weekly}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Estimated Daily Cost</span>
              <span className="font-medium">{userData.budget.currency}{Math.round(userData.budget.weekly / 7)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Budget Status</span>
              <span className="text-emerald-600 font-medium">Within Budget</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

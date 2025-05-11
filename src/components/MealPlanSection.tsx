
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Utensils, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
          { 
            id: "greek-yogurt",
            name: "Greek yogurt with berries", 
            calories: 220, 
            carbs: 28, 
            proteins: 18, 
            fats: 6 
          },
          { 
            id: "whole-grain-toast",
            name: "Whole grain toast", 
            calories: 80, 
            carbs: 15, 
            proteins: 3, 
            fats: 1 
          }
        ],
        totalCalories: 300
      },
      {
        mealType: "Lunch",
        dishes: [
          { 
            id: "grilled-chicken",
            name: "Grilled chicken salad", 
            calories: 350, 
            carbs: 15, 
            proteins: 40, 
            fats: 12 
          },
          { 
            id: "quinoa",
            name: "Quinoa", 
            calories: 120, 
            carbs: 21, 
            proteins: 4, 
            fats: 2 
          }
        ],
        totalCalories: 470
      },
      {
        mealType: "Dinner",
        dishes: [
          { 
            id: "salmon",
            name: "Salmon with steamed vegetables", 
            calories: 320, 
            carbs: 10, 
            proteins: 30, 
            fats: 18 
          },
          { 
            id: "sweet-potato",
            name: "Sweet potato", 
            calories: 150, 
            carbs: 35, 
            proteins: 2, 
            fats: 0 
          }
        ],
        totalCalories: 470
      },
      {
        mealType: "Snacks",
        dishes: [
          { 
            id: "apple-almond",
            name: "Apple with almond butter", 
            calories: 200, 
            carbs: 25, 
            proteins: 5, 
            fats: 10 
          },
          { 
            id: "carrot-sticks",
            name: "Carrot sticks", 
            calories: 50, 
            carbs: 12, 
            proteins: 1, 
            fats: 0 
          }
        ],
        totalCalories: 250
      }
    ],
    weekly: [
      // Additional mock data for weekly plan would go here
    ]
  };

  const dailyTotalCalories = mockMealPlan.daily.reduce(
    (sum, meal) => sum + meal.totalCalories, 0
  );

  // Function to handle meal logging with feedback
  const handleLogMeal = (mealType: string, dishId: string) => {
    // In a real app, this would open a modal or navigate to a feedback form
    console.log(`Logging meal: ${mealType}, Dish ID: ${dishId}`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <Tabs value={planPeriod} onValueChange={setPlanPeriod} className="w-auto">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="sm" className="text-xs">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            Today
          </Button>
        </div>
        
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-slate-500">{dailyTotalCalories} calories</span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-slate-500">
            Budget: {userData.budget.currency}{Math.round(userData.budget.weekly / 7)}
          </span>
        </div>
      </div>
      
      <Tabs value={planPeriod}>
        <TabsContent value="daily" className="mt-0">
          <div className="space-y-3">
            {mockMealPlan.daily.map((meal, index) => (
              <div key={index} className="bg-slate-50/80 p-3 rounded-md hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Utensils className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{meal.mealType}</h4>
                      <p className="text-xs text-slate-500">{meal.totalCalories} cal</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={() => handleLogMeal(meal.mealType, meal.dishes[0].id)}
                  >
                    Log
                  </Button>
                </div>
                
                <div className="pl-10 space-y-2">
                  {meal.dishes.map((dish, dishIndex) => (
                    <div key={dishIndex} className="border-l-2 border-slate-200 pl-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm">{dish.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {dish.calories} cal • {dish.carbs}g carbs • {dish.proteins}g protein • {dish.fats}g fat
                          </div>
                        </div>
                        {dish.id && (
                          <Link to={`/meal-detail/${dish.id}`}>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              Details <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-0">
          <div className="h-60 flex items-center justify-center border rounded-md">
            <div className="text-center">
              <h3 className="text-sm font-medium mb-2">Weekly Plan</h3>
              <p className="text-xs text-slate-500 mb-4">Generate a full week's meal plan based on your preferences.</p>
              <Button size="sm">Generate Weekly Plan</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

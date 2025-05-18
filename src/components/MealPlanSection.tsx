
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Utensils, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { MealFeedbackDialog } from "@/components/MealFeedbackDialog";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface MealPlanSectionProps {
  userData: {
    name: string;
    age: number;
    height: number;
    weight: number;
    diabetesType: string;
    calorieTarget: number;
    gender?: string;
    budget: {
      weekly: number;
      currency: string;
    };
  };
}

export const MealPlanSection = ({ userData }: MealPlanSectionProps) => {
  const [planPeriod, setPlanPeriod] = useState("daily");
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState({ id: "", name: "" });
  const [mealPlan, setMealPlan] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGeneratedPlan, setHasGeneratedPlan] = useState(false);
  const { user, getUserProfile } = useAuth();
  
  // Load saved meal plan on component mount
  useEffect(() => {
    const savedMealPlan = localStorage.getItem('currentMealPlan');
    if (savedMealPlan) {
      try {
        const parsedPlan = JSON.parse(savedMealPlan);
        setMealPlan(parsedPlan.mealPlan || []);
        setHasGeneratedPlan(true);
        
        // Also broadcast nutrient data to update the dashboard
        if (parsedPlan.nutrients) {
          const channel = supabase.channel('custom-update-channel');
          channel.subscribe();
          channel.send({
            type: 'broadcast',
            event: 'meal-plan-updated',
            payload: { nutrients: parsedPlan.nutrients }
          });
        }
      } catch (error) {
        console.error("Error loading saved meal plan:", error);
      }
    }
  }, []);
  
  // Function to handle meal logging with feedback
  const handleLogMeal = (mealType: string, dishId: string, dishName: string) => {
    setCurrentMeal({ id: dishId, name: dishName });
    setFeedbackDialogOpen(true);
  };

  // Function to generate meal plans based on user profile data
  const generateMealPlan = async () => {
    setIsGenerating(true);
    
    try {
      // Get user profile data
      const { data: profileData } = await getUserProfile();
      
      if (!profileData) {
        toast.error("Failed to get user profile data");
        setIsGenerating(false);
        return;
      }
      
      // Prepare user data for meal plan generation
      const userInfo = {
        name: profileData.name || "",
        age: profileData.age || 30,
        weight: profileData.weight || 70,
        height: profileData.height || 170,
        gender: profileData.gender || "male",
        allergies: profileData.dietary_restrictions ? profileData.dietary_restrictions.split(",") : [],
        dietaryPreferences: profileData.food_preferences || "none",
        budget: profileData.weekly_budget || 1800,
        calorieLimit: profileData.max_calories || 1500,
        diabetesType: profileData.diabetes_type || "Type 2"
      };
      
      // For now, we'll use the mock function instead of calling the edge function
      // This would be replaced with the actual edge function call in production
      const mockPlan = generateMockMealPlan(userInfo);
      setMealPlan(mockPlan);
      setHasGeneratedPlan(true);
      
      // Calculate nutrient totals
      const nutritionTotals = calculateNutritionTotals(mockPlan);
      const targetNutrition = {
        calories: userInfo.calorieLimit,
        carbs: Math.round(userInfo.calorieLimit * 0.5 / 4), // 50% calories from carbs
        protein: Math.round(userInfo.calorieLimit * 0.2 / 4), // 20% calories from protein
        fat: Math.round(userInfo.calorieLimit * 0.3 / 9) // 30% calories from fat
      };
      
      // Calculate percentages for progress bars
      const nutrients = {
        calories: {
          total: Math.round(nutritionTotals.calories),
          target: Math.round(targetNutrition.calories),
          percent: Math.min(Math.round((nutritionTotals.calories / targetNutrition.calories) * 100), 100)
        },
        carbs: {
          total: Math.round(nutritionTotals.carbs),
          target: Math.round(targetNutrition.carbs),
          percent: Math.min(Math.round((nutritionTotals.carbs / targetNutrition.carbs) * 100), 100)
        },
        protein: {
          total: Math.round(nutritionTotals.proteins),
          target: Math.round(targetNutrition.protein),
          percent: Math.min(Math.round((nutritionTotals.proteins / targetNutrition.protein) * 100), 100)
        },
        fat: {
          total: Math.round(nutritionTotals.fats),
          target: Math.round(targetNutrition.fat),
          percent: Math.min(Math.round((nutritionTotals.fats / targetNutrition.fat) * 100), 100)
        }
      };
      
      // Save the meal plan and nutrients to localStorage for persistence
      localStorage.setItem('currentMealPlan', JSON.stringify({
        mealPlan: mockPlan,
        nutrients: nutrients,
        date: new Date().toISOString().split('T')[0]
      }));
      
      // Broadcast the nutrients to other components (like Dashboard)
      const channel = supabase.channel('custom-update-channel');
      channel.subscribe();
      channel.send({
        type: 'broadcast',
        event: 'meal-plan-updated',
        payload: { nutrients }
      });
      
      toast.success("Meal plan generated successfully", {
        description: "Your personalized meal plan is ready"
      });
      
    } catch (error) {
      console.error("Error generating meal plan:", error);
      toast.error("Failed to generate meal plan");
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper function to calculate nutrition totals from meal plan
  const calculateNutritionTotals = (mealPlan: any[]) => {
    const totals = {
      calories: 0,
      carbs: 0,
      proteins: 0,
      fats: 0,
      fiber: 0
    };
    
    mealPlan.forEach(meal => {
      meal.dishes.forEach((dish: any) => {
        totals.calories += dish.calories || 0;
        totals.carbs += dish.carbs || 0;
        totals.proteins += dish.proteins || 0;
        totals.fats += dish.fats || 0;
        totals.fiber += dish.fiber || 0;
      });
    });
    
    return totals;
  };

  // Mock meal plan generator function - this would be replaced with your actual algorithm
  const generateMockMealPlan = (userInfo: any) => {
    // Calculate daily budget from weekly
    const dailyBudget = userInfo.budget / 7;
    
    // Calculate BMI
    const heightInM = userInfo.height / 100;
    const bmi = userInfo.weight / (heightInM * heightInM);
    
    // Adjust calories based on BMI
    let targetCalories = userInfo.calorieLimit;
    if (bmi > 25) {
      targetCalories = Math.min(targetCalories, 1500);
    }
    
    // Mock meal types based on Nigerian cuisine
    const nigerianBreakfasts = [
      { id: "akara-pap", name: "Akara and Pap", calories: 350, carbs: 55, proteins: 12, fats: 8, fiber: 5 },
      { id: "yam-egg", name: "Yam and Egg Sauce", calories: 420, carbs: 60, proteins: 15, fats: 10, fiber: 4 }
    ];
    
    const nigerianLunches = [
      { id: "jollof-rice", name: "Jollof Rice and Chicken", calories: 550, carbs: 70, proteins: 25, fats: 15, fiber: 6 },
      { id: "egusi-soup", name: "Egusi Soup with Fufu", calories: 600, carbs: 65, proteins: 20, fats: 25, fiber: 8 }
    ];
    
    const nigerianDinners = [
      { id: "plantain-beans", name: "Plantain and Beans", calories: 450, carbs: 65, proteins: 15, fats: 10, fiber: 15 },
      { id: "ofada-stew", name: "Ofada Rice and Stew", calories: 500, carbs: 60, proteins: 18, fats: 15, fiber: 7 }
    ];
    
    const nigerianSnacks = [
      { id: "chin-chin", name: "Chin Chin", calories: 200, carbs: 30, proteins: 3, fats: 8, fiber: 1 },
      { id: "plantain-chips", name: "Plantain Chips", calories: 180, carbs: 25, proteins: 2, fats: 9, fiber: 2 }
    ];
    
    // Adjust selections based on user preferences
    const breakfast = nigerianBreakfasts[Math.floor(Math.random() * nigerianBreakfasts.length)];
    const lunch = nigerianLunches[Math.floor(Math.random() * nigerianLunches.length)];
    const dinner = nigerianDinners[Math.floor(Math.random() * nigerianDinners.length)];
    const snack1 = nigerianSnacks[0];
    const snack2 = nigerianSnacks[1];
    
    // Create meal plan with categories
    return [
      {
        mealType: "Breakfast",
        dishes: [breakfast],
        totalCalories: breakfast.calories
      },
      {
        mealType: "Lunch",
        dishes: [lunch],
        totalCalories: lunch.calories
      },
      {
        mealType: "Dinner",
        dishes: [dinner],
        totalCalories: dinner.calories
      },
      {
        mealType: "Snacks",
        dishes: [snack1, snack2],
        totalCalories: snack1.calories + snack2.calories
      }
    ];
  };

  const dailyTotalCalories = mealPlan.length > 0 ? 
    mealPlan.reduce((sum, meal) => sum + meal.totalCalories, 0) : 0;

  // Empty state UI when no meal plan exists
  const EmptyMealPlanState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
        <Utensils className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-medium text-slate-800 mb-2">No Meal Plans Yet</h3>
      <p className="text-slate-500 mb-6 max-w-md">
        Generate a personalized meal plan based on your health profile and dietary preferences
      </p>
      <Button 
        onClick={generateMealPlan} 
        disabled={isGenerating} 
        className="flex items-center"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Plan...
          </>
        ) : "Generate Plan Now"}
      </Button>
    </div>
  );

  return (
    <div className="p-4">
      {mealPlan.length > 0 || hasGeneratedPlan ? (
        <>
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
                Budget: ${Math.round(userData.budget.weekly / 7)}
              </span>
            </div>
          </div>
          
          <Tabs value={planPeriod}>
            <TabsContent value="daily" className="mt-0">
              <div className="space-y-3">
                {mealPlan.map((meal, index) => (
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
                        onClick={() => handleLogMeal(meal.mealType, meal.dishes[0].id, meal.mealType)}
                      >
                        Log
                      </Button>
                    </div>
                    
                    <div className="pl-10 space-y-2">
                      {meal.dishes.map((dish: any, dishIndex: number) => (
                        <div key={dishIndex} className="border-l-2 border-slate-200 pl-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm">{dish.name}</div>
                              <div className="text-xs text-slate-500 mt-0.5">
                                {dish.calories} cal • {dish.carbs}g carbs • {dish.proteins}g protein • {dish.fats}g fat
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 text-xs"
                                onClick={() => handleLogMeal(meal.mealType, dish.id, dish.name)}
                              >
                                Log
                              </Button>
                              {dish.id && (
                                <Link to={`/meal-detail/${dish.id}`}>
                                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                    Details <ArrowRight className="ml-1 h-3 w-3" />
                                  </Button>
                                </Link>
                              )}
                            </div>
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
                  <Button size="sm" disabled={isGenerating} onClick={generateMealPlan}>
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : "Generate Weekly Plan"}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <EmptyMealPlanState />
      )}
      
      <MealFeedbackDialog 
        isOpen={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
        mealId={currentMeal.id}
        mealName={currentMeal.name}
        initialStep="options"
      />
    </div>
  );
};

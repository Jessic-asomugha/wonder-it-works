
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MealPlanSection } from "@/components/MealPlanSection";
import { NutritionStats } from "@/components/NutritionStats";
import { PlusCircle, Loader2, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MainLayout } from "@/components/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { user, getUserProfile } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    age: 0,
    height: 0,
    weight: 0,
    diabetes_type: "",
    diabetesType: "", // Added this to match the expected prop type
    calorieTarget: 2000,
    gender: "male",
    budget: {
      weekly: 150,
      currency: "$"
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [nutrientData, setNutrientData] = useState({
    calories: { total: 0, target: 2000, percent: 0 },
    carbs: { total: 0, target: 200, percent: 0 },
    protein: { total: 0, target: 100, percent: 0 },
    fat: { total: 0, target: 60, percent: 0 }
  });
  const [mealPlanGenerated, setMealPlanGenerated] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await getUserProfile();
        
        if (error) {
          console.error("Error fetching user profile:", error);
          return;
        }
        
        if (data) {
          setUserData({
            name: data.name || "User",
            age: data.age || 30,
            height: data.height || 170,
            weight: data.weight || 70,
            diabetes_type: data.diabetes_type || "Type 2",
            diabetesType: data.diabetes_type || "Type 2", // Set both properties to match
            calorieTarget: data.max_calories || 2000,
            gender: data.gender || "male",
            budget: {
              weekly: data.weekly_budget || 150,
              currency: "$"
            }
          });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [user, getUserProfile]);

  // Add a new effect to listen for mealPlan changes
  useEffect(() => {
    const fetchMealPlanNutrients = async () => {
      if (!user) return;
      
      try {
        // This is just a placeholder. The actual nutrient data will come from the MealPlanSection component.
        // We'll create a proper state management solution in a future update.
        const channel = supabase
          .channel('custom-update-channel')
          .on('broadcast', { event: 'meal-plan-updated' }, (payload) => {
            if (payload.payload && payload.payload.nutrients) {
              const nutrients = payload.payload.nutrients;
              setNutrientData(nutrients);
              setMealPlanGenerated(true);
            }
          })
          .subscribe();
          
        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.error("Error setting up meal plan listener:", error);
      }
    };
    
    fetchMealPlanNutrients();
  }, [user]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  const firstName = userData.name.split(' ')[0];

  return (
    <MainLayout>
      {/* Welcome Section - Simplified */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Welcome back, <span className="text-primary">{firstName || "User"}!</span>
        </h2>
        <p className="text-sm text-slate-500">
          Here's your personalized meal planning dashboard
        </p>
      </div>
      
      {/* Cleaner grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Main content column - Meal Plan */}
        <div className="md:col-span-2 space-y-5">
          {/* Meal Plan Card */}
          <Card className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-all border-slate-100">
            <CardHeader className="pb-2 border-b border-slate-100">
              <CardTitle className="text-base font-medium">This Week's Meal Plan</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <MealPlanSection userData={userData} />
            </CardContent>
          </Card>
          
          {/* Nutrition Stats */}
          <Card className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-all border-slate-100">
            <CardHeader className="pb-2 border-b border-slate-100">
              <CardTitle className="text-base font-medium">Nutrition Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <NutritionStats userData={userData} />
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Quick Access */}
        <div className="space-y-5">
          {/* Quick Access Card */}
          <Card className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-all border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <Link to="/glucose-monitoring">
                <Button variant="outline" className="w-full justify-start text-sm h-9">
                  <PlusCircle className="h-3.5 w-3.5 mr-2 text-primary" />
                  Log Glucose Level
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start text-sm h-9">
                <PlusCircle className="h-3.5 w-3.5 mr-2 text-primary" />
                Add Meal
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm h-9">
                <PlusCircle className="h-3.5 w-3.5 mr-2 text-primary" />
                Log Water Intake
              </Button>
            </CardContent>
          </Card>
          
          {/* Nutrition summary */}
          <Card className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-all border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Today's Nutrients</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Calories</span>
                  <span className="font-medium">
                    {mealPlanGenerated ? 
                      `${nutrientData.calories.total} / ${nutrientData.calories.target} kcal` : 
                      `${userData.calorieTarget} kcal`}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full" 
                    style={{ width: `${mealPlanGenerated ? nutrientData.calories.percent : 65}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Carbs</span>
                  <span className="font-medium">
                    {mealPlanGenerated ? 
                      `${nutrientData.carbs.total}g / ${nutrientData.carbs.target}g` : 
                      "200g"}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div 
                    className="bg-blue-400 h-1.5 rounded-full" 
                    style={{ width: `${mealPlanGenerated ? nutrientData.carbs.percent : 40}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Protein</span>
                  <span className="font-medium">
                    {mealPlanGenerated ? 
                      `${nutrientData.protein.total}g / ${nutrientData.protein.target}g` : 
                      "100g"}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div 
                    className="bg-amber-400 h-1.5 rounded-full" 
                    style={{ width: `${mealPlanGenerated ? nutrientData.protein.percent : 75}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Fat</span>
                  <span className="font-medium">
                    {mealPlanGenerated ? 
                      `${nutrientData.fat.total}g / ${nutrientData.fat.target}g` : 
                      "60g"}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div 
                    className="bg-rose-400 h-1.5 rounded-full" 
                    style={{ width: `${mealPlanGenerated ? nutrientData.fat.percent : 50}%` }}
                  ></div>
                </div>
              </div>
              
              <Link to="/analytics">
                <Button variant="secondary" size="sm" className="w-full text-xs">
                  Full Nutrition Report
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Today's Progress Card */}
          <Card className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-all border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Today's Progress</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Steps</span>
                  <span className="text-sm font-medium">6,240 / 10,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-green-400 h-1.5 rounded-full" style={{ width: "62%" }}></div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-slate-600">Water</span>
                  <span className="text-sm font-medium">1.2L / 2L</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

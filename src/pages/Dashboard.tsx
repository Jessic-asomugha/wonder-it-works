
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlucoseMonitor } from "@/components/GlucoseMonitor";
import { HealthTips } from "@/components/HealthTips";
import { MealPlanSection } from "@/components/MealPlanSection";
import { NutritionStats } from "@/components/NutritionStats";
import { User, Search, Bell, PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  // Mock user data for the dashboard components
  const userData = {
    name: "John Doe",
    age: 42,
    height: 175, // in cm
    weight: 78, // in kg
    diabetesType: "Type 2",
    calorieTarget: 2000,
    gender: "male",
    budget: {
      weekly: 150,
      currency: "$"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Simplified header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Diabetic Chef</h1>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="search" 
                placeholder="Search..." 
                className="w-full py-2 pl-10 pr-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            
            <Link to="/profile">
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-slate-100">
                <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <User size={14} />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        {/* Welcome Section - Simplified */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Welcome back, <span className="text-primary">John!</span>
          </h2>
          <p className="text-sm text-slate-500">
            Here's your personalized meal planning dashboard
          </p>
        </div>
        
        {/* Cleaner grid layout with more appropriate sizing */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Primary column - Glucose and Health */}
          <div className="space-y-5">
            {/* Glucose Monitor Card */}
            <Card className="overflow-hidden bg-white hover:shadow-md transition-all border-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Glucose Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <GlucoseMonitor diabetesType={userData.diabetesType} />
              </CardContent>
            </Card>
            
            {/* Health Tips Card */}
            <Card className="overflow-hidden bg-white hover:shadow-md transition-all border-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Health Tips</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <HealthTips diabetesType={userData.diabetesType} />
              </CardContent>
            </Card>
          </div>
          
          {/* Main content column - Meal Plan */}
          <div className="md:col-span-2 lg:col-span-2 space-y-5">
            {/* Meal Plan Card */}
            <Card className="overflow-hidden bg-white hover:shadow-md transition-all border-slate-100">
              <CardHeader className="pb-2 border-b border-slate-100">
                <CardTitle className="text-base font-medium">This Week's Meal Plan</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <MealPlanSection userData={userData} />
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Quick Access */}
          <div className="space-y-5">
            {/* Quick Access Card */}
            <Card className="overflow-hidden bg-white hover:shadow-md transition-all border-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm h-9">
                  <PlusCircle className="h-3.5 w-3.5 mr-2 text-primary" />
                  Log Glucose Level
                </Button>
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
            <Card className="overflow-hidden bg-white hover:shadow-md transition-all border-slate-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Today's Nutrients</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Calories</span>
                    <span className="font-medium">{userData.calorieTarget} kcal</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Carbs</span>
                    <span className="font-medium">200g</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Protein</span>
                    <span className="font-medium">100g</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Fat</span>
                    <span className="font-medium">60g</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div className="bg-rose-400 h-1.5 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                </div>
                
                <Button variant="secondary" size="sm" className="w-full text-xs">
                  Full Nutrition Report
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Nutrition Stats - Full width at bottom */}
          <Card className="md:col-span-3 lg:col-span-4 overflow-hidden bg-white hover:shadow-md transition-all border-slate-100">
            <CardHeader className="pb-2 border-b border-slate-100">
              <CardTitle className="text-base font-medium">Nutrition Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <NutritionStats userData={userData} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

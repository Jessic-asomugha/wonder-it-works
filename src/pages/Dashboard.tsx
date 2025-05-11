
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlucoseMonitor } from "@/components/GlucoseMonitor";
import { HealthTips } from "@/components/HealthTips";
import { MealPlanSection } from "@/components/MealPlanSection";
import { NutritionStats } from "@/components/NutritionStats";
import { User, Search, Bell } from "lucide-react";
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
      {/* Header with search bar - Pinterest style */}
      <header className="sticky top-0 z-10 bg-white shadow-sm py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">Diabetic Chef</h1>
          </div>
          
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="search" 
                placeholder="Search for recipes, meal plans..." 
                className="w-full py-2 pl-10 pr-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            
            <Link to="/profile">
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-slate-100">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="hidden md:inline text-sm font-medium">Profile</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Welcome back, <span className="text-primary">John!</span>
          </h2>
          <p className="text-slate-500">
            Here's what's cooking in your personalized meal planning dashboard
          </p>
        </div>
        
        {/* Pinterest-inspired grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Glucose Monitor Card */}
          <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Glucose Monitoring</CardTitle>
              <CardDescription>Track your glucose levels</CardDescription>
            </CardHeader>
            <CardContent>
              <GlucoseMonitor diabetesType={userData.diabetesType} />
            </CardContent>
          </Card>
          
          {/* Meal Plan Card */}
          <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 border-slate-100 md:row-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">This Week's Meal Plan</CardTitle>
              <CardDescription>Personalized for your diet needs</CardDescription>
            </CardHeader>
            <CardContent>
              <MealPlanSection userData={userData} />
            </CardContent>
          </Card>
          
          {/* Health Tips Card */}
          <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Health Tips</CardTitle>
              <CardDescription>Managing {userData.diabetesType} diabetes</CardDescription>
            </CardHeader>
            <CardContent>
              <HealthTips diabetesType={userData.diabetesType} />
            </CardContent>
          </Card>
          
          {/* Nutrition Stats Card */}
          <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 border-slate-100 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Nutrition Overview</CardTitle>
              <CardDescription>Your weekly nutritional breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <NutritionStats userData={userData} />
            </CardContent>
          </Card>
          
          {/* Quick Access Card */}
          <Card className="overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 border-slate-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Access</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button variant="outline" className="justify-start">
                <div className="w-8 h-8 mr-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs">A1C</span>
                </div>
                Log A1C Level
              </Button>
              <Button variant="outline" className="justify-start">
                <div className="w-8 h-8 mr-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs">🍽️</span>
                </div>
                Add Meal
              </Button>
              <Button variant="outline" className="justify-start">
                <div className="w-8 h-8 mr-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs">💧</span>
                </div>
                Log Water Intake
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

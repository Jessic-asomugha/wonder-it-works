
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlucoseMonitor } from "@/components/GlucoseMonitor";
import { HealthTips } from "@/components/HealthTips";
import { MealPlanSection } from "@/components/MealPlanSection";
import { NutritionStats } from "@/components/NutritionStats";
import { User } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome, <span className="text-primary">Diabetic Chef!</span>
            </h1>
            <p className="text-slate-500 mt-1">
              Your personalized meal planning dashboard
            </p>
          </div>
          
          <Link to="/profile">
            <Button variant="outline" className="flex items-center gap-2 mt-4 md:mt-0 border-slate-300 shadow-sm">
              <User size={16} />
              My Profile
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden transform transition-all hover:shadow-md hover:-translate-y-1">
              <GlucoseMonitor diabetesType={userData.diabetesType} />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden transform transition-all hover:shadow-md hover:-translate-y-1">
              <HealthTips diabetesType={userData.diabetesType} />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden transform transition-all hover:shadow-md hover:-translate-y-1">
              <MealPlanSection userData={userData} />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden transform transition-all hover:shadow-md hover:-translate-y-1">
              <NutritionStats userData={userData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

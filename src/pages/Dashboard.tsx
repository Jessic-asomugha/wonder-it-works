
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Welcome, Diabetic Chef!
          </h1>
          <p className="text-muted-foreground">
            Your personalized meal planning dashboard
          </p>
        </div>
        
        <Link to="/profile">
          <Button variant="outline" className="flex items-center gap-2">
            <User size={16} />
            My Profile
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <GlucoseMonitor diabetesType={userData.diabetesType} />
          <HealthTips diabetesType={userData.diabetesType} />
        </div>
        
        <div className="space-y-6">
          <MealPlanSection userData={userData} />
          <NutritionStats userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MealPlanSection } from "@/components/MealPlanSection";
import { GlucoseMonitor } from "@/components/GlucoseMonitor";
import { NutritionStats } from "@/components/NutritionStats";
import { HealthTips } from "@/components/HealthTips";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("meal-plan");
  
  // Mock user data - in a real app, this would come from a database
  const userData = {
    name: "Alex Smith",
    age: 32,
    height: 175, // cm
    weight: 70, // kg
    diabetesType: "Type 2",
    calorieTarget: 2100,
    budget: {
      weekly: 120,
      currency: "USD"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm py-4">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">MealPlanPro</h1>
            <Button variant="outline">Profile</Button>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="container max-w-7xl mx-auto px-4 mt-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold">Welcome back, {userData.name}!</h2>
                <p className="text-muted-foreground">Let's manage your nutrition and health today.</p>
              </div>
              <Button>Update Health Data</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <div className="container max-w-7xl mx-auto px-4 mt-8 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
            <TabsTrigger value="glucose">Glucose Monitor</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition Stats</TabsTrigger>
            <TabsTrigger value="tips">Health Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="meal-plan">
            <MealPlanSection userData={userData} />
          </TabsContent>
          
          <TabsContent value="glucose">
            <GlucoseMonitor diabetesType={userData.diabetesType} />
          </TabsContent>
          
          <TabsContent value="nutrition">
            <NutritionStats userData={userData} />
          </TabsContent>
          
          <TabsContent value="tips">
            <HealthTips diabetesType={userData.diabetesType} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

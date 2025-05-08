
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MealPlanSection } from "@/components/MealPlanSection";
import { GlucoseMonitor } from "@/components/GlucoseMonitor";
import { NutritionStats } from "@/components/NutritionStats";
import { HealthTips } from "@/components/HealthTips";
import { 
  PieChart, 
  LayoutDashboard, 
  User, 
  List, 
  CheckCheck, 
  Settings, 
  Plus, 
  Edit, 
  Activity, 
  Eye, 
  Utensils, 
  Menu 
} from "lucide-react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, 
  SidebarMenuButton, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarFooter, 
  SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("meal-plan");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
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

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, type: 'meal', title: 'Added breakfast plan', time: '2 hours ago' },
    { id: 2, type: 'glucose', title: 'Recorded glucose level', time: '5 hours ago' },
    { id: 3, type: 'meal', title: 'Updated dinner plan', time: '1 day ago' },
    { id: 4, type: 'workout', title: 'Completed 30min workout', time: '2 days ago' },
  ];

  // Mock data for meal suggestions
  const mealSuggestions = [
    { id: 1, name: 'Greek Yogurt with Berries', calories: 320, protein: 15, carbs: 40, fat: 10 },
    { id: 2, name: 'Grilled Chicken Salad', calories: 410, protein: 35, carbs: 15, fat: 22 },
    { id: 3, name: 'Quinoa Bowl with Avocado', calories: 450, protein: 12, carbs: 65, fat: 18 },
  ];

  // Mock progress data
  const progressData = {
    mealsPlanned: 18,
    mealsTotal: 21,
    glucoseReadings: 12,
    glucoseReadingsTarget: 14,
    calorieAverage: 1950,
    calorieTarget: 2100,
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center px-2">
                <div className="text-2xl font-bold gradient-heading">MealPlanPro</div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Dashboard" isActive={true}>
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Meal Plans">
                      <List />
                      <span>Meal Plans</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Progress Tracker">
                      <CheckCheck />
                      <span>Progress Tracker</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings">
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Profile">
                      <User />
                      <span>Profile</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Glucose Monitor">
                      <Activity />
                      <span>Glucose Monitor</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <div className="px-3 py-2">
                <div className="text-xs text-muted-foreground">
                  © 2025 MealPlanPro
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <div className="container max-w-7xl px-4 py-6">
              {/* Mobile Header */}
              <div className="flex md:hidden items-center justify-between mb-4">
                <div className="text-2xl font-bold gradient-heading">MealPlanPro</div>
                <SidebarTrigger />
              </div>

              {/* Welcome Banner */}
              <div className="mb-8">
                <Card className="glass-card border-t-4 border-t-primary">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h2 className="text-2xl font-semibold gradient-heading">Welcome back, {userData.name}!</h2>
                        <p className="text-muted-foreground">Let's manage your nutrition and health today.</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Edit size={16} />
                          <span>Update Profile</span>
                        </Button>
                        <Button className="flex items-center gap-2">
                          <Plus size={16} />
                          <span>New Meal</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Overview Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="dashboard-card hover-scale">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Utensils size={18} className="text-primary" />
                        Meal Planning
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Meals Planned</span>
                          <span className="font-semibold">{progressData.mealsPlanned}/{progressData.mealsTotal}</span>
                        </div>
                        <Progress value={(progressData.mealsPlanned / progressData.mealsTotal) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="dashboard-card hover-scale">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Activity size={18} className="text-primary" />
                        Glucose Readings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Weekly Readings</span>
                          <span className="font-semibold">{progressData.glucoseReadings}/{progressData.glucoseReadingsTarget}</span>
                        </div>
                        <Progress value={(progressData.glucoseReadings / progressData.glucoseReadingsTarget) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="dashboard-card hover-scale">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <PieChart size={18} className="text-primary" />
                        Calorie Tracking
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Daily Average</span>
                          <span className="font-semibold">{progressData.calorieAverage}/{progressData.calorieTarget} cal</span>
                        </div>
                        <Progress value={(progressData.calorieAverage / progressData.calorieTarget) * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Two Column Layout: Meal Suggestions and Recent Activity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Meal Suggestions */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Meal Suggestions</h2>
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border">
                        {mealSuggestions.map((meal) => (
                          <div key={meal.id} className="p-4 hover:bg-accent/10 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{meal.name}</h3>
                                <p className="text-sm text-muted-foreground">{meal.calories} cal • {meal.protein}g protein</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Eye size={16} className="mr-1" />
                                View
                              </Button>
                            </div>
                            <div className="mt-2 flex gap-2 text-xs">
                              <div className="px-2 py-1 bg-primary/10 text-primary rounded-full">Protein: {meal.protein}g</div>
                              <div className="px-2 py-1 bg-accent/30 rounded-full">Carbs: {meal.carbs}g</div>
                              <div className="px-2 py-1 bg-secondary/30 rounded-full">Fat: {meal.fat}g</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity Feed */}
                <div className="md:col-span-1">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="p-4 hover:bg-accent/10 transition-colors">
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-full ${
                                activity.type === 'meal' ? 'bg-primary/10 text-primary' :
                                activity.type === 'glucose' ? 'bg-accent/30 text-accent-foreground' :
                                'bg-secondary/30 text-secondary-foreground'
                              }`}>
                                {activity.type === 'meal' ? <Utensils size={14} /> :
                                 activity.type === 'glucose' ? <Activity size={14} /> :
                                 <CheckCheck size={14} />}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{activity.title}</p>
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Main Content Tabs */}
              <div>
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
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;

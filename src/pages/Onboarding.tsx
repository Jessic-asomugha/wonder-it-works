
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Onboarding = () => {
  const [activeTab, setActiveTab] = useState("welcome");
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">MealPlanPro</CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="welcome">Welcome</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="start">Get Started</TabsTrigger>
            </TabsList>
            
            <TabsContent value="welcome" className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">Your Personalized Health & Nutrition Partner</h2>
                <p className="text-muted-foreground">
                  Tailored meal plans based on your unique health profile, dietary needs, and budget.
                </p>
              </div>
              
              <div className="flex justify-center">
                <Button onClick={() => setActiveTab("features")}>Explore Features</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Personalized Meal Planning</h3>
                  <p className="text-sm text-muted-foreground">Custom meal plans based on your health metrics and preferences.</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Glucose Monitoring</h3>
                  <p className="text-sm text-muted-foreground">Track and monitor glucose levels with smart insights.</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Budget-Friendly Options</h3>
                  <p className="text-sm text-muted-foreground">Get meal suggestions that fit your budget constraints.</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Health Analytics</h3>
                  <p className="text-sm text-muted-foreground">Insights on your nutrition and health patterns over time.</p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => setActiveTab("welcome")}>Back</Button>
                <Button onClick={() => setActiveTab("start")}>Get Started</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="start" className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">Create Your Account</h2>
                <p className="text-muted-foreground mb-6">
                  Sign up now to start your personalized health journey.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/register">
                    <Button className="w-full sm:w-auto">Sign Up</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="w-full sm:w-auto">Already have an account? Log in</Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;

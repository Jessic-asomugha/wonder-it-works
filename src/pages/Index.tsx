
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/5 to-background pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Personalized Meal Planning for Better Health
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Plan meals based on your health needs, monitor glucose levels, and receive customized nutrition recommendations tailored to your unique profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/onboarding">
                  <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">View Demo</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background shadow-xl flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">MealPlanPro</div>
                  <p className="text-muted-foreground">Your health journey starts here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-12 md:py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform combines meal planning, health monitoring, and personalized recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-t-4 border-t-primary/80">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Personalized Meal Planning</h3>
                <p className="text-muted-foreground">
                  Get customized meal plans based on your health metrics, dietary preferences, and budget constraints.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-primary/80">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Glucose Monitoring</h3>
                <p className="text-muted-foreground">
                  Track glucose levels, get actionable insights, and receive alerts for critical readings.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-primary/80">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Nutritional Analysis</h3>
                <p className="text-muted-foreground">
                  Monitor your nutrient intake and receive recommendations based on your health goals.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-primary/80">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Budget-Friendly Options</h3>
                <p className="text-muted-foreground">
                  Set your food budget and receive meal plans that won't break the bank.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-primary/80">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Health Insights</h3>
                <p className="text-muted-foreground">
                  Get personalized health tips and recommendations based on your profile and behavior patterns.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-primary/80">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Adaptive Learning</h3>
                <p className="text-muted-foreground">
                  Our system learns from your food intake behavior over time to provide better recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-muted/30 py-16">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Health?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Start your journey to better health with personalized meal planning and glucose monitoring.
          </p>
          <Link to="/onboarding">
            <Button size="lg">Get Started Now</Button>
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-card py-8">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold">MealPlanPro</div>
            <div className="text-sm text-muted-foreground">
              © 2025 MealPlanPro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

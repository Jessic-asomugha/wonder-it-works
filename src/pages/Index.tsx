
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with enhanced design */}
      <div className="relative bg-gradient-to-b from-accent to-background pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight gradient-heading">
                Personalized Meal Planning for Better Health
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Plan meals based on your health needs, monitor glucose levels, and receive customized nutrition recommendations tailored to your unique profile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/onboarding">
                  <Button size="lg" className="w-full sm:w-auto rounded-full font-medium">Get Started</Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full font-medium">View Demo</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-accent/40 to-background shadow-xl glass-card flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2 gradient-heading">MealPlanPro</div>
                  <p className="text-muted-foreground">Your health journey starts here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-6 left-0 right-0 h-12 bg-background" style={{ clipPath: "polygon(0 0, 100% 100%, 100% 100%, 0% 100%)" }}></div>
      </div>

      {/* Feature Section with enhanced cards */}
      <div className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-heading">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform combines meal planning, health monitoring, and personalized recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="feature-card border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Personalized Meal Planning</h3>
                <p className="text-muted-foreground">
                  Get customized meal plans based on your health metrics, dietary preferences, and budget constraints.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Glucose Monitoring</h3>
                <p className="text-muted-foreground">
                  Track glucose levels, get actionable insights, and receive alerts for critical readings.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Nutritional Analysis</h3>
                <p className="text-muted-foreground">
                  Monitor your nutrient intake and receive recommendations based on your health goals.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Budget-Friendly Options</h3>
                <p className="text-muted-foreground">
                  Set your food budget and receive meal plans that won't break the bank.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Health Insights</h3>
                <p className="text-muted-foreground">
                  Get personalized health tips and recommendations based on your profile and behavior patterns.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card border-t-4 border-t-primary">
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
      
      {/* CTA Section with more visual appeal */}
      <div className="bg-gradient-to-r from-accent/30 to-primary/10 py-16 rounded-3xl mx-6 my-8">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 gradient-heading">Ready to Transform Your Health?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Start your journey to better health with personalized meal planning and glucose monitoring.
          </p>
          <Link to="/onboarding">
            <Button size="lg" className="rounded-full font-medium px-8">Get Started Now</Button>
          </Link>
        </div>
      </div>
      
      {/* Footer with subtle gradient */}
      <footer className="bg-card py-8 mt-8 border-t border-border">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold gradient-heading">MealPlanPro</div>
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

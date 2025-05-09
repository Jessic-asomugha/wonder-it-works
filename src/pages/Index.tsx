
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, DollarSign, ShoppingBag, LineChart, BookOpen, Brain, Target, Flask } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with enhanced design */}
      <div className="relative bg-gradient-to-b from-accent to-background pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight gradient-heading">
                Smarter, Healthier, Budget-Friendly Meals for Diabetic Patients
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                AI-powered meal plans tailored to your health and your wallet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/onboarding">
                  <Button size="lg" className="w-full sm:w-auto rounded-full font-medium">Start Planning Now</Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full font-medium">View Demo</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-accent/40 to-background shadow-xl glass-card flex items-center justify-center p-6">
                <img 
                  src="https://images.unsplash.com/photo-1617196701537-7329482cc9fe?q=80&w=600&auto=format&fit=crop" 
                  alt="Healthy meal with app UI mockup" 
                  className="rounded-2xl shadow-lg object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-6 left-0 right-0 h-12 bg-background" style={{ clipPath: "polygon(0 0, 100% 100%, 100% 100%, 0% 100%)" }}></div>
      </div>

      {/* Key Features Section with enhanced cards */}
      <div className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-heading">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform makes meal planning for diabetic patients simple, effective, and affordable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="feature-card border-t-4 border-t-primary">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <ChefHat className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Meal Planning</h3>
                <p className="text-muted-foreground">
                  Tailored to your medical and dietary profile.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card border-t-4 border-t-primary">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cost Optimization</h3>
                <p className="text-muted-foreground">
                  Smart choices that save money without compromising nutrition.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card border-t-4 border-t-primary">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Auto Grocery List</h3>
                <p className="text-muted-foreground">
                  Get your ingredients ready with a single click.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card border-t-4 border-t-primary">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Stay on top of your diet and improvement trends.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* About the System Section */}
      <div className="py-16 md:py-24 bg-accent/30">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 gradient-heading">About the System</h2>
              <p className="text-lg mb-4">
                MealPlanPro addresses the challenge diabetic patients face when planning meals that both manage their condition and fit their budget.
              </p>
              <p className="text-lg mb-6">
                Our system combines nutritional science with cost optimization algorithms to create affordable, delicious, and medically-appropriate meal plans for diabetic individuals.
              </p>
              <p className="text-lg">
                What sets us apart is our focus on both health outcomes and financial accessibility, making diabetes management more sustainable for everyone.
              </p>
            </div>
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop" 
                alt="System workflow diagram" 
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why Trust Us Section */}
      <div className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-heading">Why Trust Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full shrink-0">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Backed by Research</h3>
                <p className="text-muted-foreground">
                  Our recommendations are based on established dietary guidelines and current medical literature for diabetic care.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full shrink-0">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Algorithms</h3>
                <p className="text-muted-foreground">
                  Uses optimization techniques to reduce cost while maintaining optimal nutritional balance for diabetic health.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full shrink-0">
                <Flask className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Tested with Sample Profiles</h3>
                <p className="text-muted-foreground">
                  Validated using real-life diabetic scenarios to ensure practical and effective meal planning.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full shrink-0">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Purpose-Driven</h3>
                <p className="text-muted-foreground">
                  Built as a project with real-world health impact in mind, focusing on improved outcomes for diabetic patients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works */}
      <div className="py-16 md:py-24 bg-gradient-to-b from-background to-accent/20">
        <div className="container max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-heading">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Personal Details</h3>
              <p className="text-muted-foreground">
                Age, weight, health conditions, allergies, and budget constraints.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate Meal Plan</h3>
              <p className="text-muted-foreground">
                Get a customized, cost-effective meal plan suited to your needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Grocery List</h3>
              <p className="text-muted-foreground">
                Receive an organized shopping list with health tips for each ingredient.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track & Adjust</h3>
              <p className="text-muted-foreground">
                Monitor progress and refine your meal plans over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-heading">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="feature-card">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Can I customize the meals?</h3>
                <p className="text-muted-foreground">
                  Yes! You can adjust ingredients, swap meals, and set preferences for foods you enjoy or want to avoid.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">Is this system suitable for other conditions?</h3>
                <p className="text-muted-foreground">
                  While designed primarily for diabetic patients, our system can be helpful for those managing other dietary restrictions with some adjustments.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">How is cost calculated?</h3>
                <p className="text-muted-foreground">
                  We use average regional grocery prices and seasonal availability to estimate costs, allowing you to set a budget ceiling for your meal plans.
                </p>
              </CardContent>
            </Card>
            
            <Card className="feature-card">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">How often should I update my meal plan?</h3>
                <p className="text-muted-foreground">
                  We recommend refreshing your meal plan weekly, but you can generate new plans anytime your health metrics or budget changes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-accent/30 to-primary/10 py-16 rounded-3xl mx-6 my-8">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 gradient-heading">Ready to Transform Your Health?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Try a sample meal plan or sign up for our newsletter to get updates on new features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button size="lg" className="rounded-full font-medium w-full sm:w-auto">Try Demo Now</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg" className="rounded-full font-medium w-full sm:w-auto">Get Sample Meal Plan</Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer with subtle gradient */}
      <footer className="bg-card py-8 mt-8 border-t border-border">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold gradient-heading">MealPlanPro</div>
            <div className="flex gap-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link>
              <Link to="#about" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
              <Link to="#contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
            </div>
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

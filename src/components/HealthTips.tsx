
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface HealthTipsProps {
  diabetesType: string;
}

export const HealthTips = ({ diabetesType }: HealthTipsProps) => {
  const [category, setCategory] = useState("all");
  
  // Mock health tips data - in a real app this would come from a database or API
  const tips = [
    {
      id: 1,
      title: "Balance Your Plate",
      description: "Fill half your plate with non-starchy vegetables, one quarter with protein, and one quarter with starchy foods or grains.",
      category: "nutrition"
    },
    {
      id: 2,
      title: "Stay Hydrated",
      description: "Drink water instead of sugary drinks to help manage blood glucose levels and maintain hydration.",
      category: "general"
    },
    {
      id: 3,
      title: "Regular Monitoring",
      description: "Check your glucose levels as recommended by your healthcare provider to understand how different foods affect you.",
      category: "glucose"
    },
    {
      id: 4,
      title: "Be Active Daily",
      description: "Aim for at least 30 minutes of physical activity 5 days per week to help control blood glucose levels and improve insulin sensitivity.",
      category: "exercise"
    },
    {
      id: 5,
      title: "Smart Carb Choices",
      description: "Choose complex carbohydrates like whole grains, legumes, and vegetables instead of simple carbs and processed foods.",
      category: "nutrition"
    },
    {
      id: 6,
      title: "Regular Sleep Schedule",
      description: "Aim for 7-8 hours of quality sleep each night. Poor sleep can affect glucose metabolism and insulin sensitivity.",
      category: "general"
    },
    {
      id: 7,
      title: "Manage Stress",
      description: "Practice stress-reduction techniques like meditation or deep breathing. Stress can raise blood glucose levels.",
      category: "general"
    },
    {
      id: 8,
      title: "Plan for Travel",
      description: "When traveling, pack extra diabetes supplies and keep glucose tablets or quick-acting carbs easily accessible.",
      category: "general"
    }
  ];
  
  const filteredTips = category === "all" 
    ? tips 
    : tips.filter(tip => tip.category === category);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5" />
            Health Tips & Recommendations
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={category === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setCategory("all")}
            >
              All Tips
            </Button>
            <Button 
              variant={category === "nutrition" ? "default" : "outline"} 
              size="sm"
              onClick={() => setCategory("nutrition")}
            >
              Nutrition
            </Button>
            <Button 
              variant={category === "exercise" ? "default" : "outline"} 
              size="sm"
              onClick={() => setCategory("exercise")}
            >
              Exercise
            </Button>
            <Button 
              variant={category === "glucose" ? "default" : "outline"} 
              size="sm"
              onClick={() => setCategory("glucose")}
            >
              Glucose Management
            </Button>
            <Button 
              variant={category === "general" ? "default" : "outline"} 
              size="sm"
              onClick={() => setCategory("general")}
            >
              General Wellness
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTips.map((tip) => (
              <Card key={tip.id} className="hover:bg-muted/20 transition-colors">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {diabetesType === "Type 1" && (
            <Card className="mt-6 bg-muted/30">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Type 1 Diabetes Specific Tips</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Always keep fast-acting glucose tablets or gel handy for treating hypoglycemia.</li>
                  <li>Consider a continuous glucose monitor (CGM) for real-time glucose monitoring.</li>
                  <li>Learn to adjust insulin doses based on carbohydrate intake and physical activity.</li>
                </ul>
              </CardContent>
            </Card>
          )}
          
          {diabetesType === "Type 2" && (
            <Card className="mt-6 bg-muted/30">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Type 2 Diabetes Specific Tips</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Focus on weight management through sustainable dietary changes.</li>
                  <li>Incorporate regular physical activity to improve insulin sensitivity.</li>
                  <li>Monitor carbohydrate intake and choose high-fiber, low-glycemic foods.</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Progress Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">Based on your food intake behavior over the past two weeks, we've noticed:</p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <p className="font-medium">Positive Trends</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Consistent meal timing helps maintain stable glucose levels</li>
                  <li>Good protein intake at breakfast helps avoid mid-morning spikes</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-amber-500 pl-4 py-1">
                <p className="font-medium">Areas for Improvement</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Evening snacks tend to be higher in simple carbohydrates</li>
                  <li>Weekend meals show more glucose variability</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <p className="font-medium">Recommendations</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Try protein-rich evening snacks to maintain stable overnight glucose</li>
                  <li>Consider more consistent meal timing on weekends</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

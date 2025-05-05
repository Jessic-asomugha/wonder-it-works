
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

export const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    diabetesType: "none",
    activityLevel: "moderate",
    weeklyBudget: "",
    dietaryRestrictions: "",
    foodPreferences: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the data to a backend
    toast.success("Profile updated successfully", {
      description: "Your meal plan will be customized based on your profile",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Provide your health information to get personalized meal plans and recommendations
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  name="age" 
                  type="number" 
                  min="0" 
                  max="120" 
                  value={formData.age} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <select 
                  id="gender"
                  name="gender"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Health Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input 
                  id="height" 
                  name="height" 
                  type="number" 
                  min="0" 
                  value={formData.height} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  name="weight" 
                  type="number" 
                  min="0" 
                  value={formData.weight} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="diabetesType">Diabetes Type</Label>
                <select 
                  id="diabetesType"
                  name="diabetesType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.diabetesType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="none">None</option>
                  <option value="Type 1">Type 1</option>
                  <option value="Type 2">Type 2</option>
                  <option value="Prediabetes">Prediabetes</option>
                  <option value="Gestational">Gestational</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="activityLevel">Activity Level</Label>
                <select 
                  id="activityLevel"
                  name="activityLevel"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                  required
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light Activity</option>
                  <option value="moderate">Moderate Activity</option>
                  <option value="active">Very Active</option>
                  <option value="extra_active">Extra Active</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Dietary Preferences</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weeklyBudget">Weekly Food Budget ($)</Label>
                <Input 
                  id="weeklyBudget" 
                  name="weeklyBudget" 
                  type="number" 
                  min="0" 
                  value={formData.weeklyBudget} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                <Textarea 
                  id="dietaryRestrictions" 
                  name="dietaryRestrictions" 
                  placeholder="E.g., vegetarian, gluten-free, allergies, etc."
                  value={formData.dietaryRestrictions} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="foodPreferences">Food Preferences</Label>
                <Textarea 
                  id="foodPreferences" 
                  name="foodPreferences" 
                  placeholder="Foods you enjoy or dislike"
                  value={formData.foodPreferences} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit">Save Profile</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

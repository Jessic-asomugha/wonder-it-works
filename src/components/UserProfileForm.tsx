
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

export const UserProfileForm = ({ onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    username: initialData.username || "",
    age: initialData.age || "",
    gender: initialData.gender || "",
    height: initialData.height || "",
    weight: initialData.weight || "",
    diabetesType: initialData.diabetesType || "none",
    activityLevel: initialData.activityLevel || "moderate",
    weeklyBudget: initialData.weeklyBudget || "",
    dietaryRestrictions: initialData.dietaryRestrictions || "",
    foodPreferences: initialData.foodPreferences || "",
    bio: initialData.bio || "",
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
    onSave(formData);
    toast.success("Profile updated successfully", {
      description: "Your meal plan will be customized based on your profile",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-md border-none">
      <CardHeader className="pb-4 border-b">
        <CardTitle className="text-xl text-slate-800">Complete Your Profile</CardTitle>
        <CardDescription>
          Provide your health information to get personalized meal plans and recommendations
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-8 pt-6">
          {/* Personal Information section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-slate-800 border-l-4 border-primary pl-3">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
              
              {/* Email field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
              
              {/* Username field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-700">Username</Label>
                <Input 
                  id="username" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleInputChange} 
                  required 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
              
              {/* Age field */}
              <div className="space-y-2">
                <Label htmlFor="age" className="text-slate-700">Age</Label>
                <Input 
                  id="age" 
                  name="age" 
                  type="number" 
                  min="0" 
                  max="120" 
                  value={formData.age} 
                  onChange={handleInputChange} 
                  required 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
              
              {/* Gender field */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-slate-700">Gender</Label>
                <select 
                  id="gender"
                  name="gender"
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
              
              {/* Bio field */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio" className="text-slate-700">Bio</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  placeholder="Tell us a little about yourself..."
                  value={formData.bio} 
                  onChange={handleInputChange} 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
            </div>
          </div>
          
          {/* Health Information section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-slate-800 border-l-4 border-primary pl-3">Health Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Height field */}
              <div className="space-y-2">
                <Label htmlFor="height" className="text-slate-700">Height (cm)</Label>
                <Input 
                  id="height" 
                  name="height" 
                  type="number" 
                  min="0" 
                  value={formData.height} 
                  onChange={handleInputChange} 
                  required 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
              
              {/* Weight field */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-slate-700">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  name="weight" 
                  type="number" 
                  min="0" 
                  value={formData.weight} 
                  onChange={handleInputChange} 
                  required 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
              
              {/* Diabetes Type dropdown */}
              <div className="space-y-2">
                <Label htmlFor="diabetesType" className="text-slate-700">Diabetes Type</Label>
                <select 
                  id="diabetesType"
                  name="diabetesType"
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
              
              {/* Activity Level dropdown */}
              <div className="space-y-2">
                <Label htmlFor="activityLevel" className="text-slate-700">Activity Level</Label>
                <select 
                  id="activityLevel"
                  name="activityLevel"
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
          
          {/* Dietary Preferences section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-slate-800 border-l-4 border-primary pl-3">Dietary Preferences</h3>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Weekly Budget field */}
              <div className="space-y-2">
                <Label htmlFor="weeklyBudget" className="text-slate-700">Weekly Food Budget ($)</Label>
                <Input 
                  id="weeklyBudget" 
                  name="weeklyBudget" 
                  type="number" 
                  min="0" 
                  value={formData.weeklyBudget} 
                  onChange={handleInputChange} 
                  required 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
              
              {/* Dietary Restrictions field */}
              <div className="space-y-2">
                <Label htmlFor="dietaryRestrictions" className="text-slate-700">Dietary Restrictions</Label>
                <Textarea 
                  id="dietaryRestrictions" 
                  name="dietaryRestrictions" 
                  placeholder="E.g., vegetarian, gluten-free, allergies, etc."
                  value={formData.dietaryRestrictions} 
                  onChange={handleInputChange} 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
              
              {/* Food Preferences field */}
              <div className="space-y-2">
                <Label htmlFor="foodPreferences" className="text-slate-700">Food Preferences</Label>
                <Textarea 
                  id="foodPreferences" 
                  name="foodPreferences" 
                  placeholder="Foods you enjoy or dislike"
                  value={formData.foodPreferences} 
                  onChange={handleInputChange} 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between bg-slate-50 px-6 py-4 border-t">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">Save Profile</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

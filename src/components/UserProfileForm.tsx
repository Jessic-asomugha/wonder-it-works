
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Tables } from "@/integrations/supabase/types";

type ProfileRow = Tables<"profiles">;

interface UserProfileData {
  name: string;
  email: string;
  username: string;
  age: number | null;
  gender: string;
  height: number | null;
  weight: number | null;
  diabetes_type: string;
  activity_level: string;
  weekly_budget: number | null;
  dietary_restrictions: string;
  food_preferences: string;
  bio: string;
  max_calories: number | null;
}

interface UserProfileFormProps {
  onSave: (data: UserProfileData) => void;
  initialData?: Partial<UserProfileData>;
}

export const UserProfileForm = ({ onSave, initialData = {} }: UserProfileFormProps) => {
  const { updateProfile, getUserProfile, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState<UserProfileData>({
    name: initialData.name || "",
    email: initialData.email || "",
    username: initialData.username || "",
    age: initialData.age || null,
    gender: initialData.gender || "",
    height: initialData.height || null,
    weight: initialData.weight || null,
    diabetes_type: initialData.diabetes_type || "none",
    activity_level: initialData.activity_level || "moderate",
    weekly_budget: initialData.weekly_budget || null,
    dietary_restrictions: initialData.dietary_restrictions || "",
    food_preferences: initialData.food_preferences || "",
    bio: initialData.bio || "",
    max_calories: initialData.max_calories || 1500,
  });
  
  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      
      try {
        const { error, data } = await getUserProfile();
        
        if (error) {
          toast.error("Error fetching profile", {
            description: error.message,
          });
        } else if (data) {
          // Convert data types to match form structure
          setFormData({
            name: data.name || "",
            email: data.email || "",
            username: data.username || "",
            age: data.age !== null ? Number(data.age) : null,
            gender: data.gender || "",
            height: data.height !== null ? Number(data.height) : null,
            weight: data.weight !== null ? Number(data.weight) : null,
            diabetes_type: data.diabetes_type || "none",
            activity_level: data.activity_level || "moderate",
            weekly_budget: data.weekly_budget !== null ? Number(data.weekly_budget) : null,
            dietary_restrictions: data.dietary_restrictions || "",
            food_preferences: data.food_preferences || "",
            bio: data.bio || "",
            max_calories: data.max_calories !== null ? Number(data.max_calories) : 1500,
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchUserProfile();
    }
  }, [getUserProfile, user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: string | number | null = value;
    
    // Parse numeric inputs
    if (type === 'number' && value !== '') {
      parsedValue = parseFloat(value);
    } else if (type === 'number' && value === '') {
      parsedValue = null;
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const { error } = await updateProfile(formData);
      
      if (error) {
        toast.error("Failed to update profile", {
          description: error.message,
        });
      } else {
        toast.success("Profile updated successfully", {
          description: "Your meal plan will be customized based on your profile",
        });
        onSave(formData);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An unexpected error occurred", {
        description: "Please try again later",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto bg-white shadow-md border-none">
        <CardContent className="pt-6 flex justify-center items-center min-h-[300px]">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

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
                  value={formData.age || ''} 
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
                  value={formData.height || ''} 
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
                  value={formData.weight || ''} 
                  onChange={handleInputChange} 
                  required 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
              
              {/* Diabetes Type dropdown */}
              <div className="space-y-2">
                <Label htmlFor="diabetes_type" className="text-slate-700">Diabetes Type</Label>
                <select 
                  id="diabetes_type"
                  name="diabetes_type"
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  value={formData.diabetes_type}
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
                <Label htmlFor="activity_level" className="text-slate-700">Activity Level</Label>
                <select 
                  id="activity_level"
                  name="activity_level"
                  className="flex h-10 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  value={formData.activity_level}
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

              {/* Max Calories field */}
              <div className="space-y-2">
                <Label htmlFor="max_calories" className="text-slate-700">Max Calories per Day</Label>
                <Input 
                  id="max_calories" 
                  name="max_calories" 
                  type="number" 
                  min="500" 
                  value={formData.max_calories || 1500} 
                  onChange={handleInputChange} 
                  required 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
            </div>
          </div>
          
          {/* Dietary Preferences section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg text-slate-800 border-l-4 border-primary pl-3">Dietary Preferences</h3>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Weekly Budget field */}
              <div className="space-y-2">
                <Label htmlFor="weekly_budget" className="text-slate-700">Weekly Food Budget ($)</Label>
                <Input 
                  id="weekly_budget" 
                  name="weekly_budget" 
                  type="number" 
                  min="0" 
                  value={formData.weekly_budget || ''} 
                  onChange={handleInputChange} 
                  required 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
              
              {/* Dietary Restrictions field */}
              <div className="space-y-2">
                <Label htmlFor="dietary_restrictions" className="text-slate-700">Dietary Restrictions</Label>
                <Textarea 
                  id="dietary_restrictions" 
                  name="dietary_restrictions" 
                  placeholder="E.g., vegetarian, gluten-free, allergies, etc."
                  value={formData.dietary_restrictions} 
                  onChange={handleInputChange} 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
              
              {/* Food Preferences field */}
              <div className="space-y-2">
                <Label htmlFor="food_preferences" className="text-slate-700">Food Preferences</Label>
                <Textarea 
                  id="food_preferences" 
                  name="food_preferences" 
                  placeholder="Foods you enjoy or dislike"
                  value={formData.food_preferences} 
                  onChange={handleInputChange} 
                  className="border-slate-200 focus:border-primary"
                />
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between bg-slate-50 px-6 py-4 border-t">
          <Button type="button" variant="outline">Cancel</Button>
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Profile"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

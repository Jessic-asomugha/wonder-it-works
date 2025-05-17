import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

// Define the user data interface
export interface UserProfileData {
  name: string;
  email: string;
  username: string;
  bio: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
  diabetes_type: string;
  activity_level: string;
  food_preferences: string;
  dietary_restrictions: string;
  weekly_budget: number;
  max_calories: number;
}

interface UserProfileFormProps {
  onSubmit: (data: UserProfileData) => void;
  initialData?: Partial<UserProfileData>;
}

export const UserProfileForm = ({ onSubmit, initialData = {} }: UserProfileFormProps) => {
  const { updateProfile, getUserProfile, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasData, setHasData] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<UserProfileData>({
    name: "",
    email: "",
    username: "",
    bio: "",
    age: 0,
    height: 0,
    weight: 0,
    gender: "male",
    diabetes_type: "Type 2",
    activity_level: "moderate",
    food_preferences: "",
    dietary_restrictions: "",
    weekly_budget: 0,
    max_calories: 2000
  });
  
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;

      setIsLoading(true);
      
      try {
        // First, try to use initialData if it's provided
        if (initialData && Object.keys(initialData).length > 0) {
          setFormData(prev => ({
            ...prev,
            ...initialData
          }));
          setHasData(true);
          setIsLoading(false);
          return;
        }
        
        // Otherwise, fetch from database
        const { data, error } = await getUserProfile();
        
        if (error) {
          console.error("Error loading user profile:", error);
          toast({
            title: "Error loading profile",
            description: "We couldn't load your profile data",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        if (data) {
          // Check if we have meaningful profile data
          const hasProfileData = data.name || data.age || data.height || data.weight;
          setHasData(hasProfileData);
          
          setFormData(prev => ({
            ...prev,
            name: data.name || "",
            email: data.email || "",
            username: data.username || "",
            bio: data.bio || "",
            age: data.age || 0,
            height: data.height || 0,
            weight: data.weight || 0,
            gender: data.gender || "male",
            diabetes_type: data.diabetes_type || "Type 2",
            activity_level: data.activity_level || "moderate",
            food_preferences: data.food_preferences || "",
            dietary_restrictions: data.dietary_restrictions || "",
            weekly_budget: data.weekly_budget || 0,
            max_calories: data.max_calories || 2000
          }));
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserProfile();
  }, [user, getUserProfile, toast, initialData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value ? parseFloat(value) : 0
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const { error } = await updateProfile(formData);
      
      if (error) {
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile updated successfully",
          description: "Your meal plan will be customized based on your profile",
        });
        setHasData(true);
        onSubmit(formData);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Render content based on whether user has data or not
  return (
    <form onSubmit={handleSubmit}>
      <CardHeader>
        <CardTitle className="text-xl">
          {hasData ? "Your Profile Information" : "Complete Your Profile"}
        </CardTitle>
        <CardDescription>
          {hasData 
            ? "Update your personal details and preferences" 
            : "Please provide your information to get personalized meal plans"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Username (Optional)</Label>
              <Input 
                id="username"
                name="username"
                value={formData.username || ""}
                onChange={handleChange}
                placeholder="Choose a username"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio (Optional)</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              placeholder="Tell us a bit about yourself"
              rows={3}
            />
          </div>
        </div>
        
        <Separator />
        
        {/* Health Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Health Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age"
                name="age"
                type="number"
                value={formData.age || ""}
                onChange={handleNumberChange}
                placeholder="Your age"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input 
                id="height"
                name="height"
                type="number"
                value={formData.height || ""}
                onChange={handleNumberChange}
                placeholder="Height in cm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input 
                id="weight"
                name="weight"
                type="number"
                value={formData.weight || ""}
                onChange={handleNumberChange}
                placeholder="Weight in kg"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                name="gender"
                value={formData.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diabetes_type">Diabetes Type</Label>
              <Select
                name="diabetes_type"
                value={formData.diabetes_type}
                onValueChange={(value) => handleSelectChange("diabetes_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select diabetes type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Type 1">Type 1</SelectItem>
                  <SelectItem value="Type 2">Type 2</SelectItem>
                  <SelectItem value="Gestational">Gestational</SelectItem>
                  <SelectItem value="Prediabetes">Prediabetes</SelectItem>
                  <SelectItem value="None">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activity_level">Activity Level</Label>
            <Select
              name="activity_level"
              value={formData.activity_level}
              onValueChange={(value) => handleSelectChange("activity_level", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                <SelectItem value="very_active">Very Active (hard exercise daily)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Separator />
        
        {/* Diet Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Diet Preferences</h3>
          
          <div className="space-y-2">
            <Label htmlFor="food_preferences">Food Preferences</Label>
            <Textarea
              id="food_preferences"
              name="food_preferences"
              value={formData.food_preferences || ""}
              onChange={handleChange}
              placeholder="Enter your food preferences (e.g., vegetarian, low-carb, etc.)"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dietary_restrictions">Dietary Restrictions or Allergies</Label>
            <Textarea
              id="dietary_restrictions"
              name="dietary_restrictions"
              value={formData.dietary_restrictions || ""}
              onChange={handleChange}
              placeholder="Enter any allergies or foods you avoid"
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weekly_budget">Weekly Food Budget (₦)</Label>
              <Input 
                id="weekly_budget"
                name="weekly_budget"
                type="number"
                value={formData.weekly_budget || ""}
                onChange={handleNumberChange}
                placeholder="Weekly budget in Naira"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="max_calories">Daily Calorie Target</Label>
              <Input 
                id="max_calories"
                name="max_calories"
                type="number"
                value={formData.max_calories || ""}
                onChange={handleNumberChange}
                placeholder="Daily calorie target"
              />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button type="submit" disabled={isSaving} className="w-full md:w-auto">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            hasData ? "Update Profile" : "Save Profile"
          )}
        </Button>
      </CardFooter>
    </form>
  );
};

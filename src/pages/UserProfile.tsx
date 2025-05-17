
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/MainLayout";
import UserProfileHeader from "@/components/UserProfileHeader";
import { UserProfileForm } from "@/components/UserProfileForm";
import { UserSettingsForm } from "@/components/UserSettingsForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the user data type
export interface UserData {
  name: string | null;
  email: string | null;
  avatar_url: string | null; 
  username: string | null;
  bio: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  gender: string | null;
  diabetes_type: string | null;
  date_joined: string | null;
  activity_level: string | null;
  food_preferences: string | null;
  dietary_restrictions: string | null;
  weekly_budget: number | null;
  max_calories: number | null;
}

const UserProfile = () => {
  const { user, getUserProfile, updateUserProfile } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    avatar_url: null,
    username: null,
    bio: null,
    age: null,
    height: null,
    weight: null,
    gender: null,
    diabetes_type: null,
    date_joined: null,
    activity_level: null,
    food_preferences: null,
    dietary_restrictions: null,
    weekly_budget: null,
    max_calories: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await getUserProfile();
        
        if (error) {
          console.error("Error loading user profile:", error);
          toast({
            title: "Error loading profile",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
        
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Unexpected error loading user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserProfile();
  }, [user, getUserProfile, toast]);

  const handleUpdateProfile = async (updatedData: Partial<UserData>) => {
    if (!user) return;
    
    try {
      const { error } = await updateUserProfile(updatedData);
      
      if (error) {
        toast({
          title: "Error updating profile",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      // Update local state with new data
      setUserData(prev => ({ ...prev, ...updatedData }));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <UserProfileHeader />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <UserProfileForm 
              onSubmit={handleUpdateProfile}
              initialData={userData}
            />
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <Card>
            <UserSettingsForm />
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default UserProfile;

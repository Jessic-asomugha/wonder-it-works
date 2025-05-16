
import { MainLayout } from "@/components/MainLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserProfileForm } from "@/components/UserProfileForm";
import { UserSettingsForm } from "@/components/UserSettingsForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserProfileHeader from "@/components/UserProfileHeader";
import { useState } from "react";

// Define user data interface
interface UserData {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  role: string;
  diabetesType: string;
  dateJoined: string;
  bio: string;
  age?: string;
  gender?: string;
  height?: string;
  weight?: string;
  activityLevel?: string;
  weeklyBudget?: string;
  dietaryRestrictions?: string;
  foodPreferences?: string;
  preferences: {
    theme: string;
    notifications: boolean;
    emailUpdates: boolean;
  };
  stats: {
    recipesCreated: number;
    mealPlansGenerated: number;
    streakDays: number;
  };
}

const UserProfile = () => {
  // State to track if user has set up their profile
  const [profileSetup, setProfileSetup] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Mock user data - would come from a database in a real app
  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: "",
    email: "",
    username: "",
    avatar: "",
    role: "",
    diabetesType: "",
    dateJoined: new Date().toISOString().split('T')[0],
    bio: "",
    preferences: {
      theme: "light",
      notifications: true,
      emailUpdates: false,
    },
    stats: {
      recipesCreated: 0,
      mealPlansGenerated: 0,
      streakDays: 0,
    },
  });

  const handleSaveProfile = (newProfileData) => {
    setUserData({...userData, ...newProfileData});
    setProfileSetup(true);
    setIsEditMode(false);
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <UserProfileHeader />
        
        {!profileSetup && !isEditMode ? (
          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">No Profile Information Available Yet</h2>
              <p className="text-slate-600 mb-6">Set up your profile to get personalized meal plans and health insights.</p>
              <Button onClick={() => setIsEditMode(true)}>Set Up Your Profile</Button>
            </CardContent>
          </Card>
        ) : isEditMode ? (
          <div className="mt-8">
            <UserProfileForm onSave={handleSaveProfile} initialData={userData} />
          </div>
        ) : (
          <>
            <Card className="mb-6 mt-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full overflow-hidden bg-primary/10">
                    <img 
                      src={userData.avatar || "/placeholder.svg"} 
                      alt={userData.name || "Profile"} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-2xl font-bold">{userData.name || "Your Name"}</h1>
                        <p className="text-slate-500">{userData.email || "email@example.com"}</p>
                        <p className="text-sm mt-1">
                          {userData.diabetesType && (
                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                              {userData.diabetesType}
                            </span>
                          )}
                          <span className="text-slate-400 ml-2">Joined {userData.dateJoined}</span>
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => setIsEditMode(true)}>
                        Update Profile
                      </Button>
                    </div>
                  </div>
                </div>
                {userData.bio && (
                  <p className="mt-4 text-slate-600">{userData.bio}</p>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-8">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="profile">Profile Details</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-slate-500">Full Name</p>
                              <p>{userData.name || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500">Username</p>
                              <p>{userData.username || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500">Email</p>
                              <p>{userData.email || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500">Diabetes Type</p>
                              <p>{userData.diabetesType || "Not provided"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="settings" className="mt-6">
                  <UserSettingsForm />
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default UserProfile;

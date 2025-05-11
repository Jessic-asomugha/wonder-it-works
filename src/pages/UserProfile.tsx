
import { MainLayout } from "@/components/MainLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserProfileForm } from "@/components/UserProfileForm";
import { UserSettingsForm } from "@/components/UserSettingsForm";
import { Card, CardContent } from "@/components/ui/card";

// Mock user data
const userData = {
  id: "user-123",
  name: "John Doe",
  email: "john.doe@example.com",
  username: "johndoe",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  role: "user",
  diabetesType: "Type 2",
  dateJoined: "2024-01-15",
  bio: "Managing Type 2 diabetes through healthy eating and regular exercise.",
  preferences: {
    theme: "light",
    notifications: true,
    emailUpdates: false,
  },
  stats: {
    recipesCreated: 8,
    mealPlansGenerated: 12,
    streakDays: 14,
  },
};

const UserProfile = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full overflow-hidden bg-primary/10">
                <img 
                  src={userData.avatar} 
                  alt={userData.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-slate-500">{userData.email}</p>
                <p className="text-sm mt-1">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                    {userData.diabetesType}
                  </span>
                  <span className="text-slate-400 ml-2">Joined {userData.dateJoined}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-6">
              <UserProfileForm />
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
              <UserSettingsForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfile;

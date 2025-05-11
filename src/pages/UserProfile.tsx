
import { MainLayout } from "@/components/MainLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UserProfileHeader from "@/components/UserProfileHeader";
import { UserProfileForm } from "@/components/UserProfileForm";
import { UserSettingsForm } from "@/components/UserSettingsForm";

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
        <UserProfileHeader />
        
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

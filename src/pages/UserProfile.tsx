
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileForm } from "@/components/UserProfileForm";
import { UserSettingsForm } from "@/components/UserSettingsForm";
import UserProfileHeader from "@/components/UserProfileHeader";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container py-10">
        <UserProfileHeader />
        
        <Tabs 
          defaultValue="profile" 
          className="mt-6"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8 bg-white shadow-sm">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <UserProfileForm />
          </TabsContent>
          
          <TabsContent value="settings">
            <UserSettingsForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;

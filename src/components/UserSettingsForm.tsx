
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";

export function UserSettingsForm() {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Mock saving settings
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings updated",
        description: "Your account settings have been updated successfully",
      });
    }, 1000);
  };
  
  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog
    toast({
      title: "Account deletion requested",
      description: "Please contact support to complete this process",
      variant: "destructive",
    });
  };
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl">Account Settings</CardTitle>
        <CardDescription>
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Notification Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notifications</h3>
          
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-slate-500">Receive email updates about your account</p>
            </div>
            <Switch 
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <Label className="text-base">Push Notifications</Label>
              <p className="text-sm text-slate-500">Receive push notifications on your devices</p>
            </div>
            <Switch 
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </div>
        
        <Separator />
        
        {/* Theme Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Appearance</h3>
          
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <Label className="text-base">Dark Mode</Label>
              <p className="text-sm text-slate-500">Switch between themes</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
        
        <Separator />
        
        {/* Security and Account */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Security</h3>
          
          <div className="grid gap-3">
            <Button variant="outline" size="sm" className="justify-start w-full sm:w-auto">
              Change Password
            </Button>
            
            <Button variant="outline" size="sm" className="justify-start w-full sm:w-auto" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
          
          <div className="pt-4">
            <Button 
              variant="destructive" 
              size="sm" 
              className="justify-start"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
            <p className="text-xs text-slate-500 mt-2">
              This will permanently delete your account and all associated data
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </CardFooter>
    </>
  );
}


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "@/components/ui/sonner";

export const UserSettingsForm = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
    },
    privacy: {
      shareData: false,
      allowResearch: true,
    },
    appearance: {
      darkMode: false,
      highContrast: false,
    },
  });
  
  const [openSection, setOpenSection] = useState<string | null>("notifications");
  
  const toggleSetting = (category: string, setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !prev[category as keyof typeof prev][setting as any],
      },
    }));
  };
  
  const handleSave = () => {
    // In a real app, this would save to an API
    toast.success("Settings saved successfully");
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Configure your account preferences and settings
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Notifications Settings */}
        <Collapsible 
          open={openSection === "notifications"} 
          onOpenChange={() => setOpenSection(openSection === "notifications" ? null : "notifications")}
          className="border rounded-md"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left">
            <div>
              <h3 className="font-medium text-lg">Notifications</h3>
              <p className="text-sm text-muted-foreground">Manage how we contact you</p>
            </div>
            <div className="text-primary">
              {openSection === "notifications" ? "↑" : "↓"}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 border-t">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notif">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates on meal plans via email</p>
                </div>
                <Switch 
                  id="email-notif"
                  checked={settings.notifications.email}
                  onCheckedChange={() => toggleSetting("notifications", "email")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notif">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get alerts on your device</p>
                </div>
                <Switch 
                  id="push-notif" 
                  checked={settings.notifications.push}
                  onCheckedChange={() => toggleSetting("notifications", "push")}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Privacy Settings */}
        <Collapsible 
          open={openSection === "privacy"} 
          onOpenChange={() => setOpenSection(openSection === "privacy" ? null : "privacy")}
          className="border rounded-md"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left">
            <div>
              <h3 className="font-medium text-lg">Privacy</h3>
              <p className="text-sm text-muted-foreground">Manage your data and privacy preferences</p>
            </div>
            <div className="text-primary">
              {openSection === "privacy" ? "↑" : "↓"}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 border-t">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="share-data">Share Data</Label>
                  <p className="text-sm text-muted-foreground">Allow anonymous data sharing to improve our service</p>
                </div>
                <Switch 
                  id="share-data"
                  checked={settings.privacy.shareData}
                  onCheckedChange={() => toggleSetting("privacy", "shareData")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="research">Research Participation</Label>
                  <p className="text-sm text-muted-foreground">Participate in diabetes research studies</p>
                </div>
                <Switch 
                  id="research"
                  checked={settings.privacy.allowResearch}
                  onCheckedChange={() => toggleSetting("privacy", "allowResearch")}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Appearance Settings */}
        <Collapsible 
          open={openSection === "appearance"} 
          onOpenChange={() => setOpenSection(openSection === "appearance" ? null : "appearance")}
          className="border rounded-md"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left">
            <div>
              <h3 className="font-medium text-lg">Appearance</h3>
              <p className="text-sm text-muted-foreground">Customize how the app looks</p>
            </div>
            <div className="text-primary">
              {openSection === "appearance" ? "↑" : "↓"}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 border-t">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                </div>
                <Switch 
                  id="dark-mode"
                  checked={settings.appearance.darkMode}
                  onCheckedChange={() => toggleSetting("appearance", "darkMode")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="high-contrast">High Contrast</Label>
                  <p className="text-sm text-muted-foreground">Increase visibility with high contrast mode</p>
                </div>
                <Switch 
                  id="high-contrast"
                  checked={settings.appearance.highContrast}
                  onCheckedChange={() => toggleSetting("appearance", "highContrast")}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline">Reset to Default</Button>
        <Button onClick={handleSave}>Save Settings</Button>
      </CardFooter>
    </Card>
  );
};

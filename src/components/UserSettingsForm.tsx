
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
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-md border-none">
      <CardHeader className="pb-4 border-b">
        <CardTitle className="text-xl text-slate-800">Account Settings</CardTitle>
        <CardDescription>
          Configure your account preferences and settings
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6">
        {/* Notifications Settings */}
        <Collapsible 
          open={openSection === "notifications"} 
          onOpenChange={() => setOpenSection(openSection === "notifications" ? null : "notifications")}
          className="border border-slate-200 rounded-lg overflow-hidden"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors">
            <div>
              <h3 className="font-medium text-lg text-slate-800">Notifications</h3>
              <p className="text-sm text-slate-500">Manage how we contact you</p>
            </div>
            <div className="text-primary">
              {openSection === "notifications" ? "↑" : "↓"}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 bg-white border-t border-slate-200">
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notif" className="font-medium text-slate-700">Email Notifications</Label>
                  <p className="text-sm text-slate-500">Receive updates on meal plans via email</p>
                </div>
                <Switch 
                  id="email-notif"
                  checked={settings.notifications.email}
                  onCheckedChange={() => toggleSetting("notifications", "email")}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notif" className="font-medium text-slate-700">Push Notifications</Label>
                  <p className="text-sm text-slate-500">Get alerts on your device</p>
                </div>
                <Switch 
                  id="push-notif" 
                  checked={settings.notifications.push}
                  onCheckedChange={() => toggleSetting("notifications", "push")}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Privacy Settings */}
        <Collapsible 
          open={openSection === "privacy"} 
          onOpenChange={() => setOpenSection(openSection === "privacy" ? null : "privacy")}
          className="border border-slate-200 rounded-lg overflow-hidden"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors">
            <div>
              <h3 className="font-medium text-lg text-slate-800">Privacy</h3>
              <p className="text-sm text-slate-500">Manage your data and privacy preferences</p>
            </div>
            <div className="text-primary">
              {openSection === "privacy" ? "↑" : "↓"}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 bg-white border-t border-slate-200">
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="share-data" className="font-medium text-slate-700">Share Data</Label>
                  <p className="text-sm text-slate-500">Allow anonymous data sharing to improve our service</p>
                </div>
                <Switch 
                  id="share-data"
                  checked={settings.privacy.shareData}
                  onCheckedChange={() => toggleSetting("privacy", "shareData")}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="research" className="font-medium text-slate-700">Research Participation</Label>
                  <p className="text-sm text-slate-500">Participate in diabetes research studies</p>
                </div>
                <Switch 
                  id="research"
                  checked={settings.privacy.allowResearch}
                  onCheckedChange={() => toggleSetting("privacy", "allowResearch")}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Appearance Settings */}
        <Collapsible 
          open={openSection === "appearance"} 
          onOpenChange={() => setOpenSection(openSection === "appearance" ? null : "appearance")}
          className="border border-slate-200 rounded-lg overflow-hidden"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left bg-slate-50 hover:bg-slate-100 transition-colors">
            <div>
              <h3 className="font-medium text-lg text-slate-800">Appearance</h3>
              <p className="text-sm text-slate-500">Customize how the app looks</p>
            </div>
            <div className="text-primary">
              {openSection === "appearance" ? "↑" : "↓"}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 bg-white border-t border-slate-200">
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="font-medium text-slate-700">Dark Mode</Label>
                  <p className="text-sm text-slate-500">Switch between light and dark theme</p>
                </div>
                <Switch 
                  id="dark-mode"
                  checked={settings.appearance.darkMode}
                  onCheckedChange={() => toggleSetting("appearance", "darkMode")}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="high-contrast" className="font-medium text-slate-700">High Contrast</Label>
                  <p className="text-sm text-slate-500">Increase visibility with high contrast mode</p>
                </div>
                <Switch 
                  id="high-contrast"
                  checked={settings.appearance.highContrast}
                  onCheckedChange={() => toggleSetting("appearance", "highContrast")}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      
      <CardFooter className="flex justify-between bg-slate-50 px-6 py-4 border-t">
        <Button type="button" variant="outline">Reset to Default</Button>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">Save Settings</Button>
      </CardFooter>
    </Card>
  );
};

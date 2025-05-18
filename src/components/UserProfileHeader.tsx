
import { useState, useEffect } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfilePictureUploader } from './ProfilePictureUploader';

export default function UserProfileHeader() {
  const { user, getUserProfile, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    avatar_url: "",
    date_joined: ""
  });

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await getUserProfile();
        
        if (error) {
          console.error("Error loading user profile:", error);
          return;
        }
        
        if (data) {
          setUserData({
            name: data.name || user.email?.split('@')[0] || "User",
            username: data.username || "",
            avatar_url: data.avatar_url || "",
            date_joined: data.date_joined 
              ? new Date(data.date_joined).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })
              : new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })
          });
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [user, getUserProfile]);
  
  const handleAvatarUpdate = async (url: string) => {
    if (!user) return;
    
    try {
      const { error } = await updateProfile({ avatar_url: url });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Update local state
      setUserData(prev => ({
        ...prev,
        avatar_url: url
      }));
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error updating avatar:", error);
      return Promise.reject(error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="space-y-2 text-center md:text-left">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <ProfilePictureUploader 
          currentAvatarUrl={userData.avatar_url}
          userName={userData.name}
          onAvatarUpdate={handleAvatarUpdate}
        />
        
        <div className="space-y-1 text-center md:text-left">
          <h1 className="text-xl font-semibold">{userData.name || "User"}</h1>
          {userData.username && (
            <p className="text-slate-500">@{userData.username}</p>
          )}
          <p className="text-sm text-slate-400">Member since {userData.date_joined}</p>
        </div>
      </div>
    </div>
  );
}

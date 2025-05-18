
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Upload, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';

interface ProfilePictureUploaderProps {
  currentAvatarUrl?: string | null;
  userName?: string;
  onAvatarUpdate: (url: string) => Promise<void>;
}

export function ProfilePictureUploader({ 
  currentAvatarUrl, 
  userName = "User",
  onAvatarUpdate 
}: ProfilePictureUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl || null);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Create a temporary preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Upload to Supabase storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          upsert: true,
          cacheControl: '3600'
        });
        
      if (uploadError) {
        throw new Error(uploadError.message);
      }
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      
      // Update user profile with new avatar URL
      await onAvatarUpdate(publicUrl);
      
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully",
      });
      
      // Cleanup the object URL to avoid memory leaks
      URL.revokeObjectURL(objectUrl);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "Could not upload your profile picture",
        variant: "destructive"
      });
      // Reset preview on error
      setPreviewUrl(currentAvatarUrl);
    } finally {
      setIsUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async () => {
    if (!currentAvatarUrl && !previewUrl) return;
    
    try {
      setIsUploading(true);
      
      // Update profile with empty avatar URL
      await onAvatarUpdate('');
      
      // Reset preview
      setPreviewUrl(null);
      
      toast({
        title: "Profile picture removed",
        description: "Your profile picture has been removed",
      });
    } catch (error) {
      console.error('Error removing profile picture:', error);
      toast({
        title: "Error",
        description: "Could not remove your profile picture",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <Avatar className="w-24 h-24 border-2 border-slate-200">
          <AvatarImage src={previewUrl || undefined} alt={userName} />
          <AvatarFallback className="text-lg bg-primary/10 text-primary">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>
        
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-500/20 rounded-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        
        {previewUrl && !isUploading && (
          <button 
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
            onClick={handleRemoveImage}
            type="button"
            aria-label="Remove profile picture"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button 
          type="button"
          variant="outline" 
          size="sm"
          onClick={handleFileSelect}
          disabled={isUploading}
          className="text-xs"
        >
          <Upload className="mr-1 h-3.5 w-3.5" />
          {previewUrl ? "Change Photo" : "Upload Photo"}
        </Button>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
}

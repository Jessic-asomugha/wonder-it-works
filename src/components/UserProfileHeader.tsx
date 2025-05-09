
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const UserProfileHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-start mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Button>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24 border-4 border-primary/20">
          <AvatarImage src="/placeholder.svg" alt="Profile" />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your personal information and preferences
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;

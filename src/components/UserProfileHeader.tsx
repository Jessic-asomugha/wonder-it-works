
import { ArrowLeft, Camera } from "lucide-react";
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
          className="flex items-center gap-1 text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Button>
      </div>
      
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            <AvatarImage src="/placeholder.svg" alt="Profile" className="object-cover" />
            <AvatarFallback className="bg-primary/20 text-primary text-2xl">DP</AvatarFallback>
          </Avatar>
          <Button 
            size="icon"
            variant="secondary" 
            className="absolute bottom-0 right-0 rounded-full shadow-md h-10 w-10"
          >
            <Camera size={16} />
          </Button>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">Your Profile</h1>
          <p className="text-slate-500 mt-1">
            Manage your personal information and preferences
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;

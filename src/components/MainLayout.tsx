
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, User, ThumbsUp, Thermometer, Bell, MessageSquare, StarHalf, FileText } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  
  const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Health Tips", href: "/health-tips", icon: ThumbsUp },
    { name: "Glucose Monitoring", href: "/glucose-monitoring", icon: Thermometer },
    { name: "Chat Assistant", href: "/chatbot", icon: MessageSquare },
    { name: "Feedback", href: "/feedback", icon: StarHalf },
    { name: "Notifications", href: "/notifications", icon: Bell },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <div className="py-4 px-3">
                <h1 className="text-xl font-bold text-primary">Diabetic Chef</h1>
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.href}
                        tooltip={item.name}
                      >
                        <Link to={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="sticky top-0 z-10 bg-white shadow-sm py-3 px-4 flex justify-between items-center">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1 max-w-md mx-auto">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full py-2 pl-10 pr-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>
            <Link to="/profile">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center hover:bg-primary/30 transition-colors">
                <User size={16} />
              </div>
            </Link>
          </div>
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

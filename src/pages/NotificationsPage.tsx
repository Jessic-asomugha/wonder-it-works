
import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const NotificationsPage = () => {
  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: "Glucose reminder",
      message: "Time to check your glucose levels",
      time: "Today, 10:30 AM",
      read: false
    },
    {
      id: 2,
      title: "Meal suggestion",
      message: "We've updated your meal plan based on your recent activities",
      time: "Yesterday, 3:15 PM",
      read: true
    },
    {
      id: 3,
      title: "Activity goal achieved",
      message: "Congratulations! You've reached your weekly activity goal",
      time: "May 9, 2:45 PM",
      read: true
    }
  ];
  
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button className="text-sm text-primary hover:underline">Mark all as read</button>
      </div>
      
      <div className="space-y-4">
        {notifications.map(notification => (
          <Card key={notification.id} className={`hover:shadow-md transition-shadow ${!notification.read ? "border-l-4 border-l-primary" : ""}`}>
            <CardContent className="p-4 flex items-start gap-3">
              <div className={`mt-1 p-2 rounded-full ${!notification.read ? "bg-primary/10" : "bg-slate-100"}`}>
                <Bell size={16} className={!notification.read ? "text-primary" : "text-slate-400"} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-medium ${!notification.read ? "text-primary" : ""}`}>{notification.title}</h3>
                  <span className="text-xs text-slate-500">{notification.time}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;

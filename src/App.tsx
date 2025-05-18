
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import HealthTipsPage from "./pages/HealthTipsPage";
import GlucoseMonitoringPage from "./pages/GlucoseMonitoringPage";
import NotificationsPage from "./pages/NotificationsPage";
import MealDetail from "./pages/MealDetail";
import ChatbotPage from "./pages/ChatbotPage";
import FeedbackPage from "./pages/FeedbackPage";
import ActivityPage from "./pages/ActivityPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./hooks/ThemeProvider";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/onboarding" element={<Onboarding />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/health-tips" element={<HealthTipsPage />} />
      <Route path="/glucose-monitoring" element={<GlucoseMonitoringPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/meal-detail/:mealId" element={<MealDetail />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/activity" element={<ActivityPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <AppRoutes />
            <Toaster />
            <Sonner />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

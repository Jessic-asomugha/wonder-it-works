
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Calendar, Activity, Heart, Apple, Utensils, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/sonner";

interface GlucoseReading {
  id: string;
  reading_value: number;
  reading_time: string;
  notes?: string;
  meal_related?: boolean;
}

interface NutrientData {
  name: string;
  value: number;
}

interface HealthInsight {
  title: string;
  description: string;
  icon: any;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsPage = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("week");
  const [isLoading, setIsLoading] = useState(true);
  const [glucoseData, setGlucoseData] = useState<any[]>([]);
  const [mealData, setMealData] = useState<NutrientData[]>([
    { name: 'Carbs', value: 0 },
    { name: 'Protein', value: 0 },
    { name: 'Fats', value: 0 },
    { name: 'Fiber', value: 0 },
  ]);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [healthInsights, setHealthInsights] = useState<HealthInsight[]>([]);

  useEffect(() => {
    if (!user) return;

    // Function to fetch glucose data
    const fetchGlucoseData = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('glucose_readings')
          .select('*')
          .eq('user_id', user.id)
          .order('reading_time', { ascending: true });
          
        // Apply time range filter
        const now = new Date();
        let startDate;
        
        switch (timeRange) {
          case 'week':
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 7);
            query = query.gte('reading_time', startDate.toISOString());
            break;
          case 'month':
            startDate = new Date(now);
            startDate.setMonth(now.getMonth() - 1);
            query = query.gte('reading_time', startDate.toISOString());
            break;
          case 'quarter':
            startDate = new Date(now);
            startDate.setMonth(now.getMonth() - 3);
            query = query.gte('reading_time', startDate.toISOString());
            break;
        }
        
        const { data, error } = await query;
        
        if (error) {
          console.error("Error fetching glucose data:", error);
          toast.error("Failed to load glucose data");
          return;
        }
        
        if (data && data.length > 0) {
          // Process the data for the chart by day
          const chartData = processGlucoseDataByDay(data);
          setGlucoseData(chartData);
          
          // Generate insights based on the glucose data
          const insights = generateInsights(data);
          setHealthInsights(insights);
        } else {
          // Use placeholder data if no data exists
          setGlucoseData([
            { date: 'Mon', value: 110, target: 100 },
            { date: 'Tue', value: 125, target: 100 },
            { date: 'Wed', value: 115, target: 100 },
            { date: 'Thu', value: 105, target: 100 },
            { date: 'Fri', value: 130, target: 100 },
            { date: 'Sat', value: 120, target: 100 },
            { date: 'Sun', value: 118, target: 100 },
          ]);
        }
        
        // Load meal data
        fetchMealData();
        
        // Just placeholder for activity data for now
        setActivityData([
          { date: 'Mon', minutes: 15 },
          { date: 'Tue', minutes: 30 },
          { date: 'Wed', minutes: 45 },
          { date: 'Thu', minutes: 20 },
          { date: 'Fri', minutes: 35 },
          { date: 'Sat', minutes: 60 },
          { date: 'Sun', minutes: 25 },
        ]);
        
      } catch (error) {
        console.error("Error loading analytics data:", error);
        toast.error("Error loading analytics data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGlucoseData();
  }, [user, timeRange]);
  
  // Process glucose data to group by day for charting
  const processGlucoseDataByDay = (data: GlucoseReading[]) => {
    const processedData: Record<string, {values: number[], date: string}> = {};
    
    // Group readings by day
    data.forEach(reading => {
      const date = new Date(reading.reading_time);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dateKey = date.toISOString().split('T')[0];
      
      if (!processedData[dateKey]) {
        processedData[dateKey] = { values: [], date: day };
      }
      
      processedData[dateKey].values.push(reading.reading_value);
    });
    
    // Calculate average for each day
    return Object.values(processedData).map(day => ({
      date: day.date,
      value: day.values.reduce((sum, val) => sum + val, 0) / day.values.length,
      target: 100 // Target line
    })).slice(-7); // Last 7 days
  };
  
  // Fetch meal plan data
  const fetchMealData = async () => {
    try {
      // For now, just use placeholder data
      // In a real implementation, you would fetch from the database
      setMealData([
        { name: 'Carbs', value: 45 },
        { name: 'Protein', value: 30 },
        { name: 'Fats', value: 15 },
        { name: 'Fiber', value: 10 },
      ]);
    } catch (error) {
      console.error("Error fetching meal data:", error);
    }
  };
  
  // Generate health insights based on glucose data
  const generateInsights = (data: GlucoseReading[]): HealthInsight[] => {
    // Default insights if no pattern is detected
    const defaultInsights: HealthInsight[] = [
      {
        title: "Blood Sugar Patterns",
        description: "Your glucose levels tend to peak after meals. Consider timing your medication appropriately.",
        icon: Heart
      },
      {
        title: "Nutrition Balance",
        description: "Your protein intake is below recommended levels. Try incorporating more lean protein sources in your meals.",
        icon: Apple
      },
      {
        title: "Activity Impact",
        description: "On days with regular activity, your glucose levels stay within target range more consistently.",
        icon: Activity
      },
      {
        title: "Meal Timing",
        description: "Eating regular meals every 4-5 hours appears to help stabilize your glucose levels throughout the day.",
        icon: Utensils
      }
    ];
    
    // If we have enough data, try to detect patterns
    if (data.length > 5) {
      const mealRelatedReadings = data.filter(reading => reading.meal_related);
      const nonMealReadings = data.filter(reading => !reading.meal_related);
      
      const insights: HealthInsight[] = [];
      
      // Check for post-meal spikes
      if (mealRelatedReadings.length > 0) {
        const avgMealRelated = mealRelatedReadings.reduce((sum, reading) => sum + reading.reading_value, 0) / mealRelatedReadings.length;
        const avgNonMeal = nonMealReadings.length > 0 
          ? nonMealReadings.reduce((sum, reading) => sum + reading.reading_value, 0) / nonMealReadings.length
          : 0;
          
        if (avgMealRelated > avgNonMeal + 30) {
          insights.push({
            title: "Post-Meal Glucose Spikes",
            description: "Your glucose tends to spike significantly after meals. Consider adjusting carbohydrate intake or timing of medication.",
            icon: Heart
          });
        }
      }
      
      // More insights based on patterns could be added here
      
      return insights.length > 0 ? insights : defaultInsights;
    }
    
    return defaultInsights;
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Health Analytics</h1>
            <p className="text-muted-foreground">Track your health metrics and discover insights</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="glucose">
          <TabsList className="mb-4">
            <TabsTrigger value="glucose">Glucose Levels</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="glucose" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blood Glucose Trends</CardTitle>
                <CardDescription>Your blood glucose readings over time with target range</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={glucoseData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis label={{ value: 'mg/dL', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} name="Glucose" />
                      <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeDasharray="5 5" name="Target" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="nutrition" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nutritional Breakdown</CardTitle>
                <CardDescription>Average macronutrient distribution in your meals</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-[300px] h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mealData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {mealData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium">Nutritional Analysis</h3>
                  <p>Your meal composition is generally well-balanced, but could benefit from increased protein intake to support muscle maintenance and blood sugar stability.</p>
                  <p>Current macronutrient breakdown:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Carbohydrates: {mealData[0].value}% (Recommendation: 40-45%)</li>
                    <li>Protein: {mealData[1].value}% (Recommendation: 30-35%)</li>
                    <li>Fats: {mealData[2].value}% (Recommendation: 20-25%)</li>
                    <li>Fiber: {mealData[3].value}% (Recommendation: 5-10%)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Physical Activity</CardTitle>
                <CardDescription>Your daily activity levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="minutes" fill="#82ca9d" name="Activity Duration" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <h2 className="text-2xl font-bold mt-6 mb-4">Health Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healthInsights.map((insight, index) => (
            <Card key={index}>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <insight.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">{insight.title}</h3>
                  <p className="text-muted-foreground">{insight.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;

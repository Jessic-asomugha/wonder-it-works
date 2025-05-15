
import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Download, Calendar, Activity, Heart, Apple, Utensils } from "lucide-react";

const glucoseData = [
  { date: 'Mon', value: 110, target: 100 },
  { date: 'Tue', value: 125, target: 100 },
  { date: 'Wed', value: 115, target: 100 },
  { date: 'Thu', value: 105, target: 100 },
  { date: 'Fri', value: 130, target: 100 },
  { date: 'Sat', value: 120, target: 100 },
  { date: 'Sun', value: 118, target: 100 },
];

const mealData = [
  { name: 'Carbs', value: 45 },
  { name: 'Protein', value: 30 },
  { name: 'Fats', value: 15 },
  { name: 'Fiber', value: 10 },
];

const activityData = [
  { date: 'Mon', minutes: 15 },
  { date: 'Tue', minutes: 30 },
  { date: 'Wed', minutes: 45 },
  { date: 'Thu', minutes: 20 },
  { date: 'Fri', minutes: 35 },
  { date: 'Sat', minutes: 60 },
  { date: 'Sun', minutes: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const healthInsights = [
  {
    title: "Blood Sugar Patterns",
    description: "Your glucose levels tend to peak after lunch. Consider adjusting your carb intake during midday meals.",
    icon: Heart
  },
  {
    title: "Nutrition Balance",
    description: "Your protein intake is below recommended levels. Try incorporating more lean protein sources in your meals.",
    icon: Apple
  },
  {
    title: "Activity Impact",
    description: "On days with 30+ minutes of activity, your glucose levels stay within target range more consistently.",
    icon: Activity
  },
  {
    title: "Meal Timing",
    description: "Eating regular meals every 4-5 hours appears to help stabilize your glucose levels throughout the day.",
    icon: Utensils
  }
];

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("week");

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
                    <li>Carbohydrates: 45% (Recommendation: 40-45%)</li>
                    <li>Protein: 30% (Recommendation: 30-35%)</li>
                    <li>Fats: 15% (Recommendation: 20-25%)</li>
                    <li>Fiber: 10% (Recommendation: 5-10%)</li>
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


import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell 
} from "recharts";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Activity, Heart, TrendingUp, TrendingDown } from "lucide-react";

const glucoseData = [
  { day: "Mon", reading: 120 },
  { day: "Tue", reading: 135 },
  { day: "Wed", reading: 115 },
  { day: "Thu", reading: 125 },
  { day: "Fri", reading: 110 },
  { day: "Sat", reading: 105 },
  { day: "Sun", reading: 118 },
];

const mealImpactData = [
  { meal: "Breakfast", glucoseImpact: 20 },
  { meal: "Lunch", glucoseImpact: 15 },
  { meal: "Dinner", glucoseImpact: 25 },
  { meal: "Snacks", glucoseImpact: 10 },
];

const activityData = [
  { name: "Walking", value: 40 },
  { name: "Running", value: 15 },
  { name: "Cycling", value: 20 },
  { name: "Swimming", value: 10 },
  { name: "Other", value: 15 },
];

const COLORS = ["#9b87f5", "#7E69AB", "#D6BCFA", "#E5DEFF", "#D3E4FD"];

const progressData = [
  { month: "Jan", weight: 82, goal: 79 },
  { month: "Feb", weight: 81, goal: 79 },
  { month: "Mar", weight: 80, goal: 79 },
  { month: "Apr", weight: 79.5, goal: 79 },
  { month: "May", weight: 79, goal: 79 },
  { month: "Jun", weight: 78, goal: 78 },
];

const AnalyticsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Health Analytics</h1>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            Last Updated: Today, 3:45 PM
          </div>
        </div>

        <Tabs defaultValue="insights">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Blood Glucose</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">118mg/dL</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">5% lower</span>
                    <span className="text-muted-foreground ml-1">than last week</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Highest Reading</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">135mg/dL</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Tuesday after lunch
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Lowest Reading</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <TrendingDown className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">105mg/dL</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Saturday morning
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Health Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">87/100</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+3 points</span>
                    <span className="text-muted-foreground ml-1">this month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Glucose Readings (Weekly)</CardTitle>
                </CardHeader>
                <CardContent>
                  <AspectRatio ratio={16/9}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={glucoseData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis domain={[95, 140]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="reading" 
                          stroke="#9b87f5" 
                          activeDot={{ r: 8 }} 
                          strokeWidth={2} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </AspectRatio>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Activity Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <AspectRatio ratio={16/9}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={activityData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {activityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </AspectRatio>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meal Impact on Glucose Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={21/9}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mealImpactData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="meal" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="glucoseImpact" fill="#9b87f5" />
                    </BarChart>
                  </ResponsiveContainer>
                </AspectRatio>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Observations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="bg-green-100 p-2 rounded-full">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Lower Morning Readings</h4>
                      <p className="text-sm text-muted-foreground">Your morning glucose readings have been consistently lower this week.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <TrendingUp className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Post-Lunch Spikes</h4>
                      <p className="text-sm text-muted-foreground">There's a pattern of glucose spikes after lunch on workdays.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Exercise Impact</h4>
                      <p className="text-sm text-muted-foreground">Walking for 20+ minutes appears to stabilize your glucose levels.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Morning Exercise</h4>
                      <p className="text-sm text-muted-foreground">Try a 15-minute morning walk to help maintain stable glucose levels throughout the day.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Lunch Adjustments</h4>
                      <p className="text-sm text-muted-foreground">Consider reducing carbohydrates at lunch and adding more fiber to slow glucose absorption.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Evening Routine</h4>
                      <p className="text-sm text-muted-foreground">A light activity after dinner could help improve your morning readings.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weight vs. Goal Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <AspectRatio ratio={21/9}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[77, 83]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="weight" stroke="#9b87f5" activeDot={{ r: 8 }} strokeWidth={2} />
                      <Line type="monotone" dataKey="goal" stroke="#7E69AB" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </AspectRatio>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Starting Weight</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">82kg</div>
                  <div className="text-sm text-muted-foreground mt-1">January 2025</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Current Weight</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78kg</div>
                  <div className="text-sm text-muted-foreground mt-1">June 2025</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <TrendingDown className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-2xl font-bold text-green-500">4kg</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Over 6 months</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Long-term Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Weight Goal</span>
                    <span className="text-sm text-primary font-medium">78kg / 75kg</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "66%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Activity Goal</span>
                    <span className="text-sm text-primary font-medium">4 / 5 days per week</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">A1c Level Goal</span>
                    <span className="text-sm text-primary font-medium">6.8% / 6.5%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;


import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Glucose, Plus, ChartBar } from "lucide-react";

import { toast } from "@/components/ui/sonner";

interface GlucoseMonitorProps {
  diabetesType: string;
}

export const GlucoseMonitor = ({ diabetesType }: GlucoseMonitorProps) => {
  const [activeTab, setActiveTab] = useState("log");
  const [glucoseValue, setGlucoseValue] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("before-breakfast");
  
  // Mock glucose data - in a real app this would come from a database
  const mockGlucoseReadings = [
    { time: "2025-05-05T07:30:00", value: 126, context: "Before Breakfast" },
    { time: "2025-05-05T12:00:00", value: 142, context: "Before Lunch" },
    { time: "2025-05-05T18:00:00", value: 118, context: "Before Dinner" },
    { time: "2025-05-04T07:30:00", value: 132, context: "Before Breakfast" },
    { time: "2025-05-04T12:00:00", value: 145, context: "Before Lunch" },
    { time: "2025-05-04T18:00:00", value: 122, context: "Before Dinner" },
  ];

  const handleGlucoseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!glucoseValue) {
      toast.error("Please enter a glucose reading");
      return;
    }
    
    const numericValue = parseInt(glucoseValue);
    
    // Validate and provide feedback based on the glucose reading
    if (numericValue < 70) {
      toast.warning("Low glucose detected! Consider having a carb snack.", {
        description: "Your glucose reading is below the normal range.",
      });
    } else if (numericValue > 180) {
      toast.warning("High glucose detected!", {
        description: "Your glucose is above target. Review your recent meal or medication.",
      });
    } else {
      toast.success("Glucose reading saved", {
        description: "Your glucose level is within target range.",
      });
    }
    
    // Reset form (in a real app, this would also save the data to a backend)
    setGlucoseValue("");
  };
  
  const getTimeString = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getGlucoseStatus = (value: number) => {
    if (value < 70) return "low";
    if (value > 180) return "high";
    return "normal";
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Glucose className="h-5 w-5" />
            <span>Glucose Monitoring</span>
          </CardTitle>
          <CardDescription>Track and monitor your glucose levels throughout the day</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="log">Log Glucose</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="log" className="space-y-6 mt-6">
              <form onSubmit={handleGlucoseSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="glucose-value">Glucose Reading (mg/dL)</Label>
                    <Input 
                      id="glucose-value"
                      type="number" 
                      placeholder="Enter glucose value"
                      value={glucoseValue}
                      onChange={(e) => setGlucoseValue(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time-of-day">When</Label>
                    <select 
                      id="time-of-day"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={timeOfDay}
                      onChange={(e) => setTimeOfDay(e.target.value)}
                    >
                      <option value="before-breakfast">Before Breakfast</option>
                      <option value="after-breakfast">After Breakfast</option>
                      <option value="before-lunch">Before Lunch</option>
                      <option value="after-lunch">After Lunch</option>
                      <option value="before-dinner">Before Dinner</option>
                      <option value="after-dinner">After Dinner</option>
                      <option value="before-exercise">Before Exercise</option>
                      <option value="after-exercise">After Exercise</option>
                      <option value="bedtime">Bedtime</option>
                      <option value="overnight">Overnight</option>
                      <option value="feeling-symptoms">Feeling Symptoms</option>
                    </select>
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Save Reading
                </Button>
              </form>
              
              <Alert>
                <AlertTitle>Monitoring Recommendation</AlertTitle>
                <AlertDescription>
                  {diabetesType === "Type 1" ? (
                    "For Type 1 diabetes, check glucose levels at least 4-7 times a day, including before meals and at bedtime."
                  ) : (
                    "For Type 2 diabetes, check glucose levels 1-2 times a day, varying the times to get a good picture of your levels."
                  )}
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Recent Readings</h3>
                <Button variant="outline" size="sm">
                  <ChartBar className="h-4 w-4 mr-2" />
                  View Trends
                </Button>
              </div>
              
              <div className="space-y-3">
                {mockGlucoseReadings.map((reading, index) => {
                  const status = getGlucoseStatus(reading.value);
                  return (
                    <div 
                      key={index}
                      className="flex justify-between items-center p-3 border rounded-md"
                    >
                      <div>
                        <div className="font-medium">{reading.context}</div>
                        <div className="text-sm text-muted-foreground">{getTimeString(reading.time)}</div>
                      </div>
                      <div className={`text-lg font-semibold ${
                        status === "low" ? "text-amber-500" : 
                        status === "high" ? "text-red-500" : 
                        "text-emerald-500"
                      }`}>
                        {reading.value} mg/dL
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="bg-muted/30 flex justify-between">
          <div className="text-sm text-muted-foreground">
            Target Range: <span className="font-medium">70-180 mg/dL</span>
          </div>
          <Button variant="outline" size="sm">View Guidelines</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>When To Check Glucose</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>Before meals (3/day) and snacks</li>
            <li>Before and after exercise</li>
            <li>Bedtime and occasionally overnight (e.g., 2 AM to prevent lows)</li>
            <li>Before driving or critical tasks</li>
            <li>If symptoms of hypo/hyperglycemia (shakiness, sweating, confusion)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

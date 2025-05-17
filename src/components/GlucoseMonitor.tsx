
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Thermometer, Plus, ChartBar, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface GlucoseMonitorProps {
  diabetesType: string;
}

interface GlucoseReading {
  id: string;
  reading_value: number;
  reading_time: string;
  context: string;
  notes?: string;
}

export const GlucoseMonitor = ({ diabetesType }: GlucoseMonitorProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("log");
  const [glucoseValue, setGlucoseValue] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("before-breakfast");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [glucoseReadings, setGlucoseReadings] = useState<GlucoseReading[]>([]);
  
  // Load glucose readings when component mounts
  useEffect(() => {
    if (!user) return;
    
    const fetchGlucoseReadings = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('glucose_readings')
          .select('*')
          .eq('user_id', user.id)
          .order('reading_time', { ascending: false })
          .limit(20);
          
        if (error) {
          console.error("Error fetching glucose readings:", error);
          toast.error("Failed to load glucose readings");
          return;
        }
        
        if (data && data.length > 0) {
          // Map the data to include a context field based on the notes
          const mappedData = data.map(reading => ({
            ...reading,
            context: getContextFromNotes(reading.notes || "", reading.meal_related)
          }));
          setGlucoseReadings(mappedData);
        } else {
          setGlucoseReadings([]);
        }
      } catch (error) {
        console.error("Error fetching glucose readings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGlucoseReadings();
  }, [user]);

  const getContextFromNotes = (notes: string, mealRelated: boolean | null): string => {
    if (notes.toLowerCase().includes("breakfast")) return "Before Breakfast";
    if (notes.toLowerCase().includes("lunch")) return "Before Lunch";
    if (notes.toLowerCase().includes("dinner")) return "Before Dinner";
    if (notes.toLowerCase().includes("after eating")) return "After Meal";
    if (mealRelated) return "Meal Related";
    return "Daily Check";
  };

  const handleGlucoseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to submit glucose readings");
      return;
    }
    
    if (!glucoseValue) {
      toast.error("Please enter a glucose reading");
      return;
    }
    
    const numericValue = parseInt(glucoseValue);
    setIsSubmitting(true);
    
    try {
      // Get context based on timeOfDay
      const context = convertTimeOfDayToContext(timeOfDay);
      
      // Save to database
      const { data, error } = await supabase
        .from('glucose_readings')
        .insert([{
          user_id: user.id,
          reading_value: numericValue,
          reading_time: new Date().toISOString(),
          notes: notes || context,
          meal_related: timeOfDay.includes('after')
        }])
        .select();
      
      if (error) {
        console.error("Error saving glucose reading:", error);
        toast.error("Failed to save glucose reading");
        return;
      }
      
      // Add the new reading to the state
      if (data && data[0]) {
        const newReading = {
          ...data[0],
          context
        };
        setGlucoseReadings([newReading, ...glucoseReadings]);
      }
      
      // Provide feedback based on the glucose reading
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
      
      // Reset form
      setGlucoseValue("");
      setNotes("");
      // Switch to history tab
      setActiveTab("history");
      
    } catch (error) {
      console.error("Error in glucose submission:", error);
      toast.error("An error occurred while saving your reading");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const convertTimeOfDayToContext = (timeOfDay: string): string => {
    switch (timeOfDay) {
      case 'before-breakfast': return "Before Breakfast";
      case 'after-breakfast': return "After Breakfast";
      case 'before-lunch': return "Before Lunch";
      case 'after-lunch': return "After Lunch";
      case 'before-dinner': return "Before Dinner";
      case 'after-dinner': return "After Dinner";
      case 'before-exercise': return "Before Exercise";
      case 'after-exercise': return "After Exercise";
      case 'bedtime': return "Bedtime";
      case 'overnight': return "Overnight";
      case 'feeling-symptoms': return "Feeling Symptoms";
      default: return "Daily Check";
    }
  };
  
  const getTimeString = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getGlucoseStatus = (value: number) => {
    if (value < 70) return "low";
    if (value > 180) return "high";
    return "normal";
  };

  const handleViewTrends = () => {
    navigate('/analytics');
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
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
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Add details about this reading"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Save Reading
                    </>
                  )}
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
                <Button variant="outline" size="sm" onClick={handleViewTrends}>
                  <ChartBar className="h-4 w-4 mr-2" />
                  View Trends
                </Button>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : glucoseReadings.length > 0 ? (
                <div className="space-y-3">
                  {glucoseReadings.map((reading) => {
                    const status = getGlucoseStatus(reading.reading_value);
                    return (
                      <div 
                        key={reading.id}
                        className="flex justify-between items-center p-3 border rounded-md"
                      >
                        <div>
                          <div className="font-medium">{reading.context}</div>
                          <div className="text-sm text-muted-foreground">{getTimeString(reading.reading_time)}</div>
                        </div>
                        <div className={`text-lg font-semibold ${
                          status === "low" ? "text-amber-500" : 
                          status === "high" ? "text-red-500" : 
                          "text-emerald-500"
                        }`}>
                          {reading.reading_value} mg/dL
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="mb-4">
                    <Thermometer className="h-12 w-12 mx-auto text-slate-300" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-700">No readings yet</h4>
                  <p className="text-sm text-slate-500 mt-2 mb-4">
                    Start tracking your glucose levels to see your history here
                  </p>
                  <Button onClick={() => setActiveTab("log")} variant="outline">
                    Log Your First Reading
                  </Button>
                </div>
              )}
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

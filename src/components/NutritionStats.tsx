
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartBar } from "lucide-react";

interface NutritionStatsProps {
  userData: {
    name: string;
    age: number;
    height: number;
    weight: number;
    diabetesType: string;
    calorieTarget: number;
  };
}

export const NutritionStats = ({ userData }: NutritionStatsProps) => {
  // Mock nutritional recommendations based on user data
  const calculateNutrientRecommendations = (user: NutritionStatsProps["userData"]) => {
    // This is a simplified calculation - in a real app, this would be more sophisticated
    const bmr = user.gender === "female" 
      ? 655 + (9.6 * user.weight) + (1.8 * user.height) - (4.7 * user.age)
      : 66 + (13.7 * user.weight) + (5 * user.height) - (6.8 * user.age);
      
    const calories = Math.round(bmr * 1.2); // Assuming sedentary lifestyle
    const protein = Math.round(user.weight * 1.6); // 1.6g per kg of body weight
    const carbs = Math.round((calories * 0.5) / 4); // 50% of calories from carbs, divided by 4 cals per gram
    const fat = Math.round((calories * 0.25) / 9); // 25% of calories from fat, divided by 9 cals per gram
    
    return {
      calories,
      protein,
      carbs,
      fat,
      fiber: 25, // General recommendation, could be more personalized
      sugar: 25, // Lower for diabetes
    };
  };
  
  // For the component, we'll use hard-coded recommendations but in a real app
  // this would be calculated based on the user's data
  const recommendations = {
    calories: userData.calorieTarget,
    protein: 100, // grams
    carbs: 200, // grams
    fat: 60, // grams
    fiber: 25, // grams
    sugar: 25, // grams
  };
  
  // Mock nutrient intake data - in a real app this would come from the backend
  const weeklyIntake = [
    { day: "Monday", calories: 2000, protein: 95, carbs: 180, fat: 55 },
    { day: "Tuesday", calories: 2200, protein: 105, carbs: 210, fat: 65 },
    { day: "Wednesday", calories: 1950, protein: 90, carbs: 175, fat: 50 },
    { day: "Thursday", calories: 2100, protein: 100, carbs: 190, fat: 60 },
    { day: "Friday", calories: 2300, protein: 110, carbs: 220, fat: 70 },
    { day: "Saturday", calories: 2400, protein: 115, carbs: 230, fat: 75 },
    { day: "Sunday", calories: 2050, protein: 98, carbs: 185, fat: 58 },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Nutrient Baseline Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="pt-2">
              <CardContent className="text-center">
                <div className="text-2xl font-bold">{recommendations.calories}</div>
                <div className="text-xs text-muted-foreground mt-1">Calories</div>
              </CardContent>
            </Card>
            <Card className="pt-2">
              <CardContent className="text-center">
                <div className="text-2xl font-bold">{recommendations.protein}g</div>
                <div className="text-xs text-muted-foreground mt-1">Protein</div>
              </CardContent>
            </Card>
            <Card className="pt-2">
              <CardContent className="text-center">
                <div className="text-2xl font-bold">{recommendations.carbs}g</div>
                <div className="text-xs text-muted-foreground mt-1">Carbs</div>
              </CardContent>
            </Card>
            <Card className="pt-2">
              <CardContent className="text-center">
                <div className="text-2xl font-bold">{recommendations.fat}g</div>
                <div className="text-xs text-muted-foreground mt-1">Fat</div>
              </CardContent>
            </Card>
            <Card className="pt-2">
              <CardContent className="text-center">
                <div className="text-2xl font-bold">{recommendations.fiber}g</div>
                <div className="text-xs text-muted-foreground mt-1">Fiber</div>
              </CardContent>
            </Card>
            <Card className="pt-2">
              <CardContent className="text-center">
                <div className="text-2xl font-bold">{recommendations.sugar}g</div>
                <div className="text-xs text-muted-foreground mt-1">Sugar</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Personalized Notes</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Based on your height, weight, and age, your daily caloric needs are approximately {recommendations.calories} calories.</li>
              <li>For {userData.diabetesType} diabetes, focus on consistent carbohydrate intake and aim to stay within your target range.</li>
              <li>Include fiber-rich foods to help manage blood glucose levels.</li>
              <li>Limit added sugars and prioritize complex carbohydrates.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ChartBar className="mr-2 h-5 w-5" />
            Nutrient Intake Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weekly">
            <TabsList className="mb-4">
              <TabsTrigger value="weekly">Weekly View</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weekly">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Calories</TableHead>
                    <TableHead>Protein (g)</TableHead>
                    <TableHead>Carbs (g)</TableHead>
                    <TableHead>Fat (g)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weeklyIntake.map((day) => (
                    <TableRow key={day.day}>
                      <TableCell>{day.day}</TableCell>
                      <TableCell>{day.calories}</TableCell>
                      <TableCell>{day.protein}</TableCell>
                      <TableCell>{day.carbs}</TableCell>
                      <TableCell>{day.fat}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="trends">
              <div className="h-60 flex items-center justify-center border rounded-md">
                <div className="text-center text-muted-foreground">
                  Nutritional trends visualization would be displayed here.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Add gender to userData type to support BMR calculation
NutritionStats.defaultProps = {
  userData: {
    gender: "male" // Default value
  }
};


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface NutritionStatsProps {
  userData: {
    name: string;
    age: number;
    height: number;
    weight: number;
    diabetesType: string;
    calorieTarget: number;
    gender?: string;
  };
}

export const NutritionStats = ({ userData }: NutritionStatsProps) => {
  // Mock recommendations
  const recommendations = {
    calories: userData.calorieTarget,
    protein: 100, // grams
    carbs: 200, // grams
    fat: 60, // grams
    fiber: 25, // grams
    sugar: 25, // grams
  };
  
  // Mock nutrient intake data 
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
    <div className="p-4">
      <Tabs defaultValue="weekly">
        <TabsList className="mb-4">
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly" className="mt-0">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Day</TableHead>
                  <TableHead>Calories</TableHead>
                  <TableHead>Protein (g)</TableHead>
                  <TableHead>Carbs (g)</TableHead>
                  <TableHead>Fat (g)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weeklyIntake.map((day) => (
                  <TableRow key={day.day}>
                    <TableCell className="font-medium">{day.day}</TableCell>
                    <TableCell>{day.calories}</TableCell>
                    <TableCell>{day.protein}</TableCell>
                    <TableCell>{day.carbs}</TableCell>
                    <TableCell>{day.fat}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="mt-0">
          <div className="h-60 flex items-center justify-center border rounded-md">
            <div className="text-center text-slate-500 text-sm">
              Nutritional trends visualization would be displayed here.
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <div className="bg-slate-50 p-3 rounded-md text-center">
              <div className="text-lg font-medium text-primary">{recommendations.calories}</div>
              <div className="text-xs text-slate-500">Calories</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-md text-center">
              <div className="text-lg font-medium text-primary">{recommendations.protein}g</div>
              <div className="text-xs text-slate-500">Protein</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-md text-center">
              <div className="text-lg font-medium text-primary">{recommendations.carbs}g</div>
              <div className="text-xs text-slate-500">Carbs</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-md text-center">
              <div className="text-lg font-medium text-primary">{recommendations.fat}g</div>
              <div className="text-xs text-slate-500">Fat</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-md text-center">
              <div className="text-lg font-medium text-primary">{recommendations.fiber}g</div>
              <div className="text-xs text-slate-500">Fiber</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-md text-center">
              <div className="text-lg font-medium text-primary">{recommendations.sugar}g</div>
              <div className="text-xs text-slate-500">Sugar</div>
            </div>
          </div>
          
          <div className="bg-slate-50/80 p-4 rounded-md">
            <h3 className="text-sm font-medium mb-2">Personalized Recommendations</h3>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
              <li>Based on your height, weight, and age, your daily caloric needs are approximately {recommendations.calories} calories.</li>
              <li>For {userData.diabetesType} diabetes, focus on consistent carbohydrate intake and aim to stay within your target range.</li>
              <li>Include fiber-rich foods to help manage blood glucose levels.</li>
              <li>Limit added sugars and prioritize complex carbohydrates.</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

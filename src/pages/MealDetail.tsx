
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ChefHat, Info, Utensils, Star } from "lucide-react";

// Mock meal data - in a real app, this would come from an API/database
const mockMeals = {
  "greek-yogurt": {
    id: "greek-yogurt",
    name: "Greek Yogurt with Berries",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=1000",
    description: "A protein-rich breakfast option that combines creamy Greek yogurt with an assortment of fresh berries. This meal is perfect for diabetics as it provides high-quality protein with minimal impact on blood sugar levels.",
    ingredients: [
      "1 cup plain Greek yogurt (2% fat)",
      "1/2 cup mixed berries (strawberries, blueberries, raspberries)",
      "1 tablespoon honey or sugar-free sweetener (optional)",
      "1 tablespoon crushed nuts (almonds or walnuts)",
      "1/4 teaspoon vanilla extract (optional)"
    ],
    nutrition: {
      calories: 220,
      carbs: 28,
      proteins: 18,
      fats: 6,
      fiber: 3,
      sugar: 19
    },
    healthInsights: [
      "Low glycemic index helps maintain stable blood sugar",
      "Rich in probiotics for gut health",
      "High protein content helps with satiety",
      "Berries provide antioxidants and anti-inflammatory benefits",
      "Good source of calcium for bone health"
    ],
    prepTime: "5 minutes",
    instructions: [
      "Add Greek yogurt to a bowl.",
      "Wash and prepare berries, then add them on top of the yogurt.",
      "Drizzle with honey or sweetener if desired.",
      "Sprinkle crushed nuts on top for added texture and nutrition.",
      "Add a dash of vanilla extract for additional flavor (optional)."
    ]
  },
  "grilled-chicken": {
    id: "grilled-chicken",
    name: "Grilled Chicken Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=1000",
    description: "A nutritious and satisfying salad featuring lean grilled chicken breast, fresh vegetables, and a light vinaigrette dressing. Perfect for a balanced lunch that won't spike blood sugar.",
    ingredients: [
      "4 oz grilled chicken breast, sliced",
      "2 cups mixed salad greens",
      "1/4 cup cherry tomatoes, halved",
      "1/4 cucumber, sliced",
      "1/4 red onion, thinly sliced",
      "1/4 avocado, diced",
      "1 tbsp olive oil",
      "1 tbsp balsamic vinegar",
      "Salt and pepper to taste"
    ],
    nutrition: {
      calories: 350,
      carbs: 15,
      proteins: 40,
      fats: 12,
      fiber: 6,
      sugar: 4
    },
    healthInsights: [
      "High protein content helps maintain muscle mass",
      "Healthy fats from olive oil and avocado improve insulin sensitivity",
      "Low carbohydrate content helps manage blood sugar levels",
      "Rich in vitamins and minerals from varied vegetables",
      "Fiber content aids digestion and promotes feeling of fullness"
    ],
    prepTime: "15 minutes",
    instructions: [
      "Season chicken breast with salt and pepper, then grill until fully cooked.",
      "In a large bowl, combine mixed greens, cherry tomatoes, cucumber, and red onion.",
      "Slice the cooked chicken and add to the salad.",
      "Add diced avocado.",
      "In a small bowl, whisk together olive oil and balsamic vinegar for the dressing.",
      "Drizzle the dressing over the salad and toss gently to combine.",
      "Season with additional salt and pepper if desired."
    ]
  },
  "salmon": {
    id: "salmon",
    name: "Salmon with Steamed Vegetables",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1000",
    description: "Omega-3 rich salmon paired with nutrient-dense steamed vegetables creates a balanced meal that's excellent for heart and brain health while maintaining stable blood sugar levels.",
    ingredients: [
      "5 oz salmon fillet",
      "1 cup broccoli florets",
      "1 cup cauliflower florets",
      "1 medium carrot, sliced",
      "1 tbsp olive oil",
      "1 lemon, sliced",
      "2 cloves garlic, minced",
      "Fresh dill or parsley for garnish",
      "Salt and pepper to taste"
    ],
    nutrition: {
      calories: 320,
      carbs: 10,
      proteins: 30,
      fats: 18,
      fiber: 4,
      sugar: 3
    },
    healthInsights: [
      "Omega-3 fatty acids in salmon help reduce inflammation",
      "High-quality protein supports muscle maintenance",
      "Low-carb profile ideal for blood sugar management",
      "Rich in vitamins D and B12, important for diabetic patients",
      "Cruciferous vegetables provide cancer-fighting compounds"
    ],
    prepTime: "20 minutes",
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "Place salmon on a baking sheet lined with parchment paper.",
      "Drizzle salmon with olive oil and season with salt, pepper, and minced garlic.",
      "Top with lemon slices and fresh herbs.",
      "Bake for 12-15 minutes until salmon flakes easily with a fork.",
      "Meanwhile, steam vegetables until tender-crisp, about 5-7 minutes.",
      "Season vegetables lightly with salt and pepper.",
      "Serve salmon with vegetables on the side and garnish with additional herbs if desired."
    ]
  },
  "apple-almond": {
    id: "apple-almond",
    name: "Apple with Almond Butter",
    image: "https://images.unsplash.com/photo-1568093650887-ce9b6e5ba267?auto=format&fit=crop&q=80&w=1000",
    description: "A simple yet nutritious snack combining the natural sweetness of an apple with protein-rich almond butter. This pairing helps maintain stable blood sugar levels between meals.",
    ingredients: [
      "1 medium apple, sliced",
      "2 tablespoons almond butter",
      "1/2 teaspoon cinnamon (optional)",
      "1 teaspoon chia seeds (optional for added nutrition)"
    ],
    nutrition: {
      calories: 200,
      carbs: 25,
      proteins: 5,
      fats: 10,
      fiber: 5,
      sugar: 16
    },
    healthInsights: [
      "Fiber in apple slows digestion and prevents blood sugar spikes",
      "Healthy fats and protein in almond butter promote satiety",
      "Cinnamon may help improve insulin sensitivity",
      "Rich in antioxidants and vitamin C",
      "Chia seeds provide omega-3 fatty acids and additional fiber"
    ],
    prepTime: "3 minutes",
    instructions: [
      "Wash and core the apple, then slice into wedges.",
      "Spread almond butter on each apple slice or serve on the side for dipping.",
      "Sprinkle with cinnamon if desired.",
      "Add chia seeds on top of the almond butter for extra nutrition (optional)."
    ]
  }
};

const MealDetail = () => {
  const { mealId } = useParams();
  const meal = mockMeals[mealId as keyof typeof mockMeals];

  if (!meal) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <h2 className="text-xl font-medium text-slate-600">Meal not found</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">{meal.name}</h1>
          <p className="text-slate-500 mt-1">{meal.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="md:col-span-2">
            <Card className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={meal.image} 
                  alt={meal.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3 items-center">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Prep Time</p>
                    <p className="text-sm text-slate-500">{meal.prepTime}</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-center">
                  <Utensils className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Calories</p>
                    <p className="text-sm text-slate-500">{meal.nutrition.calories} kcal</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <ChefHat className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Protein</p>
                    <p className="text-sm text-slate-500">{meal.nutrition.proteins}g</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <Info className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Carbs</p>
                    <p className="text-sm text-slate-500">{meal.nutrition.carbs}g</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {meal.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-baseline gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                    <span className="text-sm">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Health Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {meal.healthInsights.map((insight, index) => (
                  <li key={index} className="flex items-baseline gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
                    <span className="text-sm">{insight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Nutrition Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-50 rounded-md">
                <p className="text-sm font-medium">Calories</p>
                <p className="text-lg font-semibold text-primary">{meal.nutrition.calories} kcal</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-md">
                <p className="text-sm font-medium">Carbs</p>
                <p className="text-lg font-semibold text-blue-500">{meal.nutrition.carbs}g</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-md">
                <p className="text-sm font-medium">Protein</p>
                <p className="text-lg font-semibold text-amber-500">{meal.nutrition.proteins}g</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-md">
                <p className="text-sm font-medium">Fat</p>
                <p className="text-lg font-semibold text-rose-500">{meal.nutrition.fats}g</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-md">
                <p className="text-sm font-medium">Fiber</p>
                <p className="text-lg font-semibold text-green-500">{meal.nutrition.fiber}g</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-md">
                <p className="text-sm font-medium">Sugar</p>
                <p className="text-lg font-semibold text-orange-500">{meal.nutrition.sugar}g</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preparation Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {meal.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10 text-sm text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm pt-0.5">{instruction}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MealDetail;

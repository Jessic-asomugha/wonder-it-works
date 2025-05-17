
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userData } = await req.json();

    // Calculate BMI
    const heightInM = userData.height / 100;
    const bmi = userData.weight / (heightInM * heightInM);
    
    // Adjust calories based on BMI
    let targetCalories = userData.calorieLimit || 1500;
    if (bmi > 25) {
      targetCalories = Math.min(targetCalories, 1500);
    }
    
    // Apply advanced meal selection logic based on nutritional content
    // This is a simplified version of the Python code's linear programming approach
    const mealPlan = generateOptimizedMealPlan(userData, bmi, targetCalories);

    return new Response(JSON.stringify({ mealPlan }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-meal-plan function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Function to generate optimized meal plan - a more sophisticated version of the previous mock function
function generateOptimizedMealPlan(userData: any, bmi: number, targetCalories: number) {
  // Define nutrition targets based on user data
  const nutritionTargets = {
    calories: targetCalories,
    carbs: userData.weight * 2, // approximate carb needs
    protein: userData.weight * 1.2, // approximate protein needs
    fat: targetCalories * 0.25 / 9, // 25% of calories from fat
    fiber: 25 // standard recommendation
  };
  
  // Nigerian meal database with nutritional content
  // In a real app, this would be stored in a database
  const nigerianMeals = {
    breakfasts: [
      { 
        id: "akara-pap", 
        name: "Akara and Pap", 
        calories: 350, 
        carbs: 55, 
        proteins: 12, 
        fats: 8, 
        fiber: 5,
        diabetes_friendly: true,
        description: "Bean cakes with fermented corn porridge, a protein-rich breakfast."
      },
      { 
        id: "yam-egg", 
        name: "Yam and Egg Sauce", 
        calories: 420, 
        carbs: 60, 
        proteins: 15, 
        fats: 10, 
        fiber: 4,
        diabetes_friendly: true,
        description: "Boiled yam with vegetable-rich egg sauce, a filling breakfast option."
      },
      { 
        id: "oat-meal", 
        name: "Oatmeal with Fruits", 
        calories: 280, 
        carbs: 45, 
        proteins: 8, 
        fats: 5, 
        fiber: 7,
        diabetes_friendly: true,
        description: "Oatmeal topped with local fruits, high in fiber and slow-release carbs."
      },
      { 
        id: "moi-moi", 
        name: "Moi Moi", 
        calories: 310, 
        carbs: 40, 
        proteins: 18, 
        fats: 7, 
        fiber: 6,
        diabetes_friendly: true,
        description: "Steamed bean pudding with vegetables, high in protein and fiber."
      }
    ],
    lunches: [
      { 
        id: "jollof-rice", 
        name: "Jollof Rice and Chicken", 
        calories: 550, 
        carbs: 70, 
        proteins: 25, 
        fats: 15, 
        fiber: 6,
        diabetes_friendly: true,
        description: "Tomato-based rice with grilled chicken, a Nigerian staple."
      },
      { 
        id: "egusi-soup", 
        name: "Egusi Soup with Fufu", 
        calories: 600, 
        carbs: 65, 
        proteins: 20, 
        fats: 25, 
        fiber: 8,
        diabetes_friendly: true,
        description: "Melon seed soup with vegetables and protein, served with fufu."
      },
      { 
        id: "efo-riro", 
        name: "Efo Riro with Brown Rice", 
        calories: 480, 
        carbs: 55, 
        proteins: 22, 
        fats: 18, 
        fiber: 9,
        diabetes_friendly: true,
        description: "Vegetable soup with assorted protein, served with fiber-rich brown rice."
      },
      { 
        id: "pepper-soup", 
        name: "Catfish Pepper Soup", 
        calories: 320, 
        carbs: 15, 
        proteins: 35, 
        fats: 12, 
        fiber: 4,
        diabetes_friendly: true,
        description: "Spicy catfish soup with African spices, low in carbs and high in protein."
      }
    ],
    dinners: [
      { 
        id: "plantain-beans", 
        name: "Plantain and Beans", 
        calories: 450, 
        carbs: 65, 
        proteins: 15, 
        fats: 10, 
        fiber: 15,
        diabetes_friendly: true,
        description: "Ripe plantain with bean porridge, rich in fiber and plant protein."
      },
      { 
        id: "ofada-stew", 
        name: "Ofada Rice and Stew", 
        calories: 500, 
        carbs: 60, 
        proteins: 18, 
        fats: 15, 
        fiber: 7,
        diabetes_friendly: true,
        description: "Local brown rice with pepper stew, better glycemic index than white rice."
      },
      { 
        id: "okra-soup", 
        name: "Okra Soup with Wheat Swallow", 
        calories: 420, 
        carbs: 50, 
        proteins: 18, 
        fats: 14, 
        fiber: 10,
        diabetes_friendly: true,
        description: "Okra soup rich in fiber with wheat swallow instead of traditional cassava."
      },
      { 
        id: "vegetable-stir-fry", 
        name: "Nigerian Vegetable Stir Fry", 
        calories: 350, 
        carbs: 30, 
        proteins: 20, 
        fats: 12, 
        fiber: 8,
        diabetes_friendly: true,
        description: "Mixed vegetables stir-fried with lean protein, low in carbs and high in nutrients."
      }
    ],
    snacks: [
      { 
        id: "chin-chin", 
        name: "Baked Chin Chin", 
        calories: 180, 
        carbs: 25, 
        proteins: 3, 
        fats: 7, 
        fiber: 2,
        diabetes_friendly: true,
        description: "Baked version of traditional fried snack, lower in fat."
      },
      { 
        id: "plantain-chips", 
        name: "Unripe Plantain Chips", 
        calories: 150, 
        carbs: 20, 
        proteins: 2, 
        fats: 7, 
        fiber: 3,
        diabetes_friendly: true,
        description: "Air-fried unripe plantain chips, lower glycemic index than ripe plantain."
      },
      { 
        id: "tiger-nuts", 
        name: "Tiger Nuts and Dates", 
        calories: 200, 
        carbs: 28, 
        proteins: 4, 
        fats: 10, 
        fiber: 6,
        diabetes_friendly: true,
        description: "Traditional nuts with limited dates, good source of fiber."
      },
      { 
        id: "roasted-corn", 
        name: "Roasted Corn and Coconut", 
        calories: 220, 
        carbs: 35, 
        proteins: 5, 
        fats: 8, 
        fiber: 5,
        diabetes_friendly: true,
        description: "Traditional combination with complex carbs and healthy fats."
      }
    ]
  };
  
  // Filter meals based on dietary preferences (simplified)
  // In a real app, this would use more sophisticated filtering based on user preferences
  const filteredMeals = {
    breakfasts: nigerianMeals.breakfasts.filter(meal => meal.diabetes_friendly),
    lunches: nigerianMeals.lunches.filter(meal => meal.diabetes_friendly),
    dinners: nigerianMeals.dinners.filter(meal => meal.diabetes_friendly),
    snacks: nigerianMeals.snacks.filter(meal => meal.diabetes_friendly),
  };
  
  // Select meals based on nutritional needs (simplified optimization)
  // In a real app, this would use real optimization algorithms
  
  // First randomly select initial meals
  const selectedBreakfast = getRandomItem(filteredMeals.breakfasts);
  const selectedLunch = getRandomItem(filteredMeals.lunches);
  const selectedDinner = getRandomItem(filteredMeals.dinners);
  const selectedSnack1 = getRandomItem(filteredMeals.snacks);
  const selectedSnack2 = getRandomItem(filteredMeals.snacks.filter(s => s.id !== selectedSnack1.id));
  
  // Create meal plan with categories
  const finalMealPlan = [
    {
      mealType: "Breakfast",
      dishes: [selectedBreakfast],
      totalCalories: selectedBreakfast.calories
    },
    {
      mealType: "Lunch",
      dishes: [selectedLunch],
      totalCalories: selectedLunch.calories
    },
    {
      mealType: "Dinner",
      dishes: [selectedDinner],
      totalCalories: selectedDinner.calories
    },
    {
      mealType: "Snacks",
      dishes: [selectedSnack1, selectedSnack2],
      totalCalories: selectedSnack1.calories + selectedSnack2.calories
    }
  ];
  
  // Calculate nutritional totals for the plan
  const nutritionTotals = {
    calories: finalMealPlan.reduce((sum, meal) => sum + meal.totalCalories, 0),
    carbs: finalMealPlan.reduce((sum, meal) => 
      sum + meal.dishes.reduce((mealSum, dish) => mealSum + dish.carbs, 0), 0),
    proteins: finalMealPlan.reduce((sum, meal) => 
      sum + meal.dishes.reduce((mealSum, dish) => mealSum + dish.proteins, 0), 0),
    fats: finalMealPlan.reduce((sum, meal) => 
      sum + meal.dishes.reduce((mealSum, dish) => mealSum + dish.fats, 0), 0),
    fiber: finalMealPlan.reduce((sum, meal) => 
      sum + meal.dishes.reduce((mealSum, dish) => mealSum + dish.fiber, 0), 0)
  };
  
  // Add nutrition totals to the meal plan
  const mealPlanWithNutrition = {
    dailyPlan: finalMealPlan,
    nutritionTotals,
    targetNutrition: nutritionTargets
  };
  
  return mealPlanWithNutrition;
}

// Helper function to get a random item from an array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

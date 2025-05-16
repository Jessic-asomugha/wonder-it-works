
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

    // Here you would implement the Python logic in JavaScript
    // For now, just returning a mock meal plan
    const mockMealPlan = generateMockMealPlan(userData);

    return new Response(JSON.stringify({ mealPlan: mockMealPlan }), {
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

// Mock function to generate meal plans - would be replaced with actual algorithm
function generateMockMealPlan(userData: any) {
  // Calculate BMI
  const heightInM = userData.height / 100;
  const bmi = userData.weight / (heightInM * heightInM);
  
  // Adjust calories based on BMI
  let targetCalories = userData.calorieLimit || 1500;
  if (bmi > 25) {
    targetCalories = Math.min(targetCalories, 1500);
  }
  
  // Mock meal types based on Nigerian cuisine
  const nigerianBreakfasts = [
    { id: "akara-pap", name: "Akara and Pap", calories: 350, carbs: 55, proteins: 12, fats: 8, fiber: 5 },
    { id: "yam-egg", name: "Yam and Egg Sauce", calories: 420, carbs: 60, proteins: 15, fats: 10, fiber: 4 }
  ];
  
  const nigerianLunches = [
    { id: "jollof-rice", name: "Jollof Rice and Chicken", calories: 550, carbs: 70, proteins: 25, fats: 15, fiber: 6 },
    { id: "egusi-soup", name: "Egusi Soup with Fufu", calories: 600, carbs: 65, proteins: 20, fats: 25, fiber: 8 }
  ];
  
  const nigerianDinners = [
    { id: "plantain-beans", name: "Plantain and Beans", calories: 450, carbs: 65, proteins: 15, fats: 10, fiber: 15 },
    { id: "ofada-stew", name: "Ofada Rice and Stew", calories: 500, carbs: 60, proteins: 18, fats: 15, fiber: 7 }
  ];
  
  const nigerianSnacks = [
    { id: "chin-chin", name: "Chin Chin", calories: 200, carbs: 30, proteins: 3, fats: 8, fiber: 1 },
    { id: "plantain-chips", name: "Plantain Chips", calories: 180, carbs: 25, proteins: 2, fats: 9, fiber: 2 }
  ];
  
  // Adjust selections based on user preferences
  const breakfast = nigerianBreakfasts[Math.floor(Math.random() * nigerianBreakfasts.length)];
  const lunch = nigerianLunches[Math.floor(Math.random() * nigerianLunches.length)];
  const dinner = nigerianDinners[Math.floor(Math.random() * nigerianDinners.length)];
  const snack1 = nigerianSnacks[0];
  const snack2 = nigerianSnacks[1];
  
  // Create meal plan with categories
  return [
    {
      mealType: "Breakfast",
      dishes: [breakfast],
      totalCalories: breakfast.calories
    },
    {
      mealType: "Lunch",
      dishes: [lunch],
      totalCalories: lunch.calories
    },
    {
      mealType: "Dinner",
      dishes: [dinner],
      totalCalories: dinner.calories
    },
    {
      mealType: "Snacks",
      dishes: [snack1, snack2],
      totalCalories: snack1.calories + snack2.calories
    }
  ];
}

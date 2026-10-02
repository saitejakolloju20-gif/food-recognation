export interface BoundingBox {
  ymin: number;
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface DetectedFoodItem {
  id: string;
  name: string;
  category: 'Protein' | 'Carbohydrate' | 'Vegetable' | 'Fruit' | 'Dairy' | 'Fat & Oil' | 'Sauce & Condiment' | 'Beverage' | 'Other';
  confidence: number; // 0 - 100
  estimatedWeightGrams: number;
  portionDescription: string;
  calories: number;
  macronutrients: {
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
    sugar?: number;
  };
  box2d?: [number, number, number, number]; // [ymin, xmin, ymax, xmax] 0-1000
  color?: string;
}

export interface MealAnalysisResult {
  mealName: string;
  cuisine: string;
  summary: string;
  totalCalories: number;
  macronutrients: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number; // mg
    potassium: number; // mg
    cholesterol: number; // mg
  };
  micronutrients: Array<{
    name: string;
    amount: string;
    percentDailyValue: number;
  }>;
  dietaryAttributes: {
    isGlutenFree: boolean;
    isDairyFree: boolean;
    isVegetarian: boolean;
    isVegan: boolean;
    isKetoFriendly: boolean;
    isLowSodium: boolean;
    allergens: string[];
  };
  glycemicIndex: {
    rating: 'Low' | 'Medium' | 'High';
    value: number;
    glycemicLoad: number;
  };
  nutriScore: 'A' | 'B' | 'C' | 'D' | 'E';
  healthAssessment: string;
  detectedItems: DetectedFoodItem[];
  workoutBurnEquivalents: {
    runningMinutes: number;
    cyclingMinutes: number;
    swimmingMinutes: number;
    walkingMinutes: number;
  };
  deepLearningMetrics: {
    modelName: string;
    inferenceTimeMs: number;
    featuresAnalyzed: string[];
    volumetricEstimationMethod: string;
    overallConfidence: number;
  };
  recommendations: string[];
}

export interface DailyLogEntry {
  id: string;
  timestamp: number;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  mealName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portionMultiplier: number;
  imageUrl?: string;
  detectedCount: number;
}

export interface UserNutritionGoals {
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  goalType: 'Weight Loss' | 'Muscle Gain' | 'Maintenance' | 'Ketogenic' | 'Endurance';
}

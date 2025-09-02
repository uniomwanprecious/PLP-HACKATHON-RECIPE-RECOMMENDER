export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  dietaryTags: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface RecipeRequest {
  ingredients: string[];
  dietaryRestrictions?: string[];
  cuisinePreference?: string;
  cookingTime?: number;
  servings?: number;
}
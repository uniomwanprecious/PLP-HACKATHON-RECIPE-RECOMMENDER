import { Recipe, RecipeRequest } from '../types/recipe';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export class RecipeService {
  private static async callOpenAI(prompt: string): Promise<string> {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional chef and nutritionist. Generate detailed, practical recipes based on available ingredients. Always respond with valid JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  static async generateRecipes(request: RecipeRequest): Promise<Recipe[]> {
    const { ingredients, dietaryRestrictions, cuisinePreference, cookingTime, servings } = request;

    const prompt = `
      Generate 3 unique recipes using these available ingredients: ${ingredients.join(', ')}.
      
      Requirements:
      ${dietaryRestrictions?.length ? `- Dietary restrictions: ${dietaryRestrictions.join(', ')}` : ''}
      ${cuisinePreference ? `- Cuisine preference: ${cuisinePreference}` : ''}
      ${cookingTime ? `- Maximum cooking time: ${cookingTime} minutes` : ''}
      ${servings ? `- Servings: ${servings}` : ''}
      
      For each recipe, provide:
      1. A creative, appetizing title
      2. Brief description (1-2 sentences)
      3. Complete ingredient list with quantities
      4. Step-by-step instructions
      5. Estimated cooking time in minutes
      6. Number of servings
      7. Difficulty level (Easy/Medium/Hard)
      8. Cuisine type
      9. Dietary tags (vegetarian, vegan, gluten-free, etc.)
      10. Basic nutritional information (calories, protein, carbs, fat per serving)
      
      Respond with a JSON array of recipe objects. Each recipe should have this exact structure:
      {
        "title": "Recipe Name",
        "description": "Brief description",
        "ingredients": ["ingredient 1", "ingredient 2"],
        "instructions": ["step 1", "step 2"],
        "cookTime": 30,
        "servings": 4,
        "difficulty": "Easy",
        "cuisine": "Italian",
        "dietaryTags": ["vegetarian"],
        "nutritionalInfo": {
          "calories": 350,
          "protein": 15,
          "carbs": 45,
          "fat": 12
        }
      }
    `;

    try {
      const response = await this.callOpenAI(prompt);
      const recipes = JSON.parse(response);
      
      return recipes.map((recipe: any, index: number) => ({
        id: `ai-recipe-${Date.now()}-${index}`,
        ...recipe
      }));
    } catch (error) {
      console.error('Error generating recipes:', error);
      throw new Error('Failed to generate recipes. Please try again.');
    }
  }

  static async analyzeIngredients(ingredients: string[]): Promise<{
    suggestions: string[];
    missingEssentials: string[];
    cuisineRecommendations: string[];
  }> {
    const prompt = `
      Analyze these ingredients: ${ingredients.join(', ')}.
      
      Provide suggestions for:
      1. Additional ingredients that would complement these well
      2. Essential cooking ingredients that might be missing (salt, oil, etc.)
      3. Cuisine types that work best with these ingredients
      
      Respond with JSON in this format:
      {
        "suggestions": ["suggested ingredient 1", "suggested ingredient 2"],
        "missingEssentials": ["salt", "olive oil"],
        "cuisineRecommendations": ["Italian", "Mediterranean"]
      }
    `;

    try {
      const response = await this.callOpenAI(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Error analyzing ingredients:', error);
      return {
        suggestions: [],
        missingEssentials: [],
        cuisineRecommendations: []
      };
    }
  }
}
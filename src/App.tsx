import React, { useState } from 'react';
import { ChefHat, Sparkles, Lightbulb } from 'lucide-react';
import { IngredientInput } from './components/IngredientInput';
import { RecipeCard } from './components/RecipeCard';
import { PreferencesPanel } from './components/PreferencesPanel';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { RecipeService } from './services/recipeService';
import { Recipe } from './types/recipe';
import './App.css';

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<{
    suggestions: string[];
    missingEssentials: string[];
    cuisineRecommendations: string[];
  } | null>(null);

  // Preferences
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [cuisinePreference, setCuisinePreference] = useState('');
  const [cookingTime, setCookingTime] = useState(30);
  const [servings, setServings] = useState(4);

  const generateRecipes = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const recipeRequest = {
        ingredients,
        dietaryRestrictions: dietaryRestrictions.length > 0 ? dietaryRestrictions : undefined,
        cuisinePreference: cuisinePreference || undefined,
        cookingTime,
        servings
      };

      const generatedRecipes = await RecipeService.generateRecipes(recipeRequest);
      setRecipes(generatedRecipes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recipes');
    } finally {
      setLoading(false);
    }
  };

  const analyzeIngredients = async () => {
    if (ingredients.length === 0) return;

    try {
      const analysis = await RecipeService.analyzeIngredients(ingredients);
      setSuggestions(analysis);
    } catch (err) {
      console.error('Failed to analyze ingredients:', err);
    }
  };

  const handleIngredientsChange = (newIngredients: string[]) => {
    setIngredients(newIngredients);
    setError(null);
    if (newIngredients.length > 0) {
      analyzeIngredients();
    } else {
      setSuggestions(null);
    }
  };

  const addSuggestedIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient.toLowerCase())) {
      setIngredients([...ingredients, ingredient.toLowerCase()]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <ChefHat className="w-12 h-12 text-orange-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              AI Recipe Recommender
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your available ingredients into delicious, personalized recipes using the power of AI
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input and Preferences */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">What's in your kitchen?</h2>
              <IngredientInput
                ingredients={ingredients}
                onIngredientsChange={handleIngredientsChange}
                disabled={loading}
              />
              
              {ingredients.length > 0 && (
                <button
                  onClick={generateRecipes}
                  disabled={loading}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} />
                  Generate AI Recipes
                </button>
              )}
            </div>

            <PreferencesPanel
              dietaryRestrictions={dietaryRestrictions}
              onDietaryRestrictionsChange={setDietaryRestrictions}
              cuisinePreference={cuisinePreference}
              onCuisinePreferenceChange={setCuisinePreference}
              cookingTime={cookingTime}
              onCookingTimeChange={setCookingTime}
              servings={servings}
              onServingsChange={setServings}
              disabled={loading}
            />

            {/* Ingredient Suggestions */}
            {suggestions && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Smart Suggestions</h3>
                </div>
                
                {suggestions.suggestions.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended additions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => addSuggestedIngredient(suggestion)}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors duration-150"
                        >
                          + {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {suggestions.missingEssentials.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Essential ingredients:</h4>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.missingEssentials.map((essential, index) => (
                        <button
                          key={index}
                          onClick={() => addSuggestedIngredient(essential)}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors duration-150"
                        >
                          + {essential}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {suggestions.cuisineRecommendations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended cuisines:</h4>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.cuisineRecommendations.map((cuisine, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                        >
                          {cuisine}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            {loading && <LoadingSpinner />}
            
            {error && (
              <ErrorMessage 
                message={error} 
                onRetry={() => {
                  setError(null);
                  generateRecipes();
                }}
              />
            )}

            {recipes.length > 0 && !loading && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Your Personalized Recipes
                  </h2>
                  <p className="text-gray-600">
                    Generated based on your ingredients and preferences
                  </p>
                </div>
                
                <div className="grid gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </div>
            )}

            {!loading && !error && recipes.length === 0 && ingredients.length > 0 && (
              <div className="text-center py-12">
                <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to cook?</h3>
                <p className="text-gray-500">Click "Generate AI Recipes" to get personalized recipe recommendations!</p>
              </div>
            )}

            {ingredients.length === 0 && (
              <div className="text-center py-12">
                <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Let's get cooking!</h3>
                <p className="text-gray-500">Add some ingredients to get started with AI-powered recipe recommendations.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
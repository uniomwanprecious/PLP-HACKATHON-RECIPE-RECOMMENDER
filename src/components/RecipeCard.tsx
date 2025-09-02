import React from 'react';
import { Clock, Users, ChefHat, Tag } from 'lucide-react';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800 leading-tight">{recipe.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">{recipe.description}</p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat size={16} />
            <span>{recipe.cuisine}</span>
          </div>
        </div>

        {recipe.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {recipe.dietaryTags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Ingredients:</h4>
            <ul className="space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Instructions:</h4>
            <ol className="space-y-2">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          {recipe.nutritionalInfo && (
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-800 mb-2 text-sm">Nutrition (per serving):</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calories:</span>
                  <span className="font-medium">{recipe.nutritionalInfo.calories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein:</span>
                  <span className="font-medium">{recipe.nutritionalInfo.protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbs:</span>
                  <span className="font-medium">{recipe.nutritionalInfo.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fat:</span>
                  <span className="font-medium">{recipe.nutritionalInfo.fat}g</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
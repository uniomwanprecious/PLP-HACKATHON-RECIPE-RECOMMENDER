import React, { useState, KeyboardEvent } from 'react';
import { Plus, X } from 'lucide-react';

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
  disabled?: boolean;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredients,
  onIngredientsChange,
  disabled = false
}) => {
  const [inputValue, setInputValue] = useState('');

  const addIngredient = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed.toLowerCase())) {
      onIngredientsChange([...ingredients, trimmed.toLowerCase()]);
      setInputValue('');
    }
  };

  const removeIngredient = (index: number) => {
    onIngredientsChange(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter an ingredient (e.g., chicken, tomatoes, rice)"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
          disabled={disabled}
        />
        <button
          onClick={addIngredient}
          disabled={disabled || !inputValue.trim()}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Plus size={20} />
          Add
        </button>
      </div>

      {ingredients.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Your Ingredients:</h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(index)}
                  disabled={disabled}
                  className="ml-1 hover:bg-orange-200 rounded-full p-0.5 transition-colors duration-150 disabled:opacity-50"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
import React from 'react';
import { Settings } from 'lucide-react';

interface PreferencesPanelProps {
  dietaryRestrictions: string[];
  onDietaryRestrictionsChange: (restrictions: string[]) => void;
  cuisinePreference: string;
  onCuisinePreferenceChange: (cuisine: string) => void;
  cookingTime: number;
  onCookingTimeChange: (time: number) => void;
  servings: number;
  onServingsChange: (servings: number) => void;
  disabled?: boolean;
}

const DIETARY_OPTIONS = [
  'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'low-carb', 'keto', 'paleo'
];

const CUISINE_OPTIONS = [
  '', 'Italian', 'Mexican', 'Asian', 'Mediterranean', 'Indian', 'American', 'French', 'Thai', 'Japanese'
];

export const PreferencesPanel: React.FC<PreferencesPanelProps> = ({
  dietaryRestrictions,
  onDietaryRestrictionsChange,
  cuisinePreference,
  onCuisinePreferenceChange,
  cookingTime,
  onCookingTimeChange,
  servings,
  onServingsChange,
  disabled = false
}) => {
  const toggleDietaryRestriction = (restriction: string) => {
    if (dietaryRestrictions.includes(restriction)) {
      onDietaryRestrictionsChange(dietaryRestrictions.filter(r => r !== restriction));
    } else {
      onDietaryRestrictionsChange([...dietaryRestrictions, restriction]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings size={20} className="text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-800">Preferences</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dietary Restrictions
          </label>
          <div className="flex flex-wrap gap-2">
            {DIETARY_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => toggleDietaryRestriction(option)}
                disabled={disabled}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-50 ${
                  dietaryRestrictions.includes(option)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cuisine Preference
          </label>
          <select
            value={cuisinePreference}
            onChange={(e) => onCuisinePreferenceChange(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
          >
            <option value="">Any Cuisine</option>
            {CUISINE_OPTIONS.slice(1).map((cuisine) => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Cooking Time (minutes)
            </label>
            <input
              type="number"
              value={cookingTime}
              onChange={(e) => onCookingTimeChange(parseInt(e.target.value) || 30)}
              min="10"
              max="180"
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Servings
            </label>
            <input
              type="number"
              value={servings}
              onChange={(e) => onServingsChange(parseInt(e.target.value) || 4)}
              min="1"
              max="12"
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
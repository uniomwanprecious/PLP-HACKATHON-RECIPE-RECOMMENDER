# AI-Powered Recipe Recommender

A modern web application that generates personalized recipe recommendations based on your available ingredients using artificial intelligence.

## Features

- **AI-Powered Recipe Generation**: Uses OpenAI's GPT to create unique recipes based on your ingredients
- **Smart Ingredient Analysis**: Provides suggestions for complementary ingredients and missing essentials
- **Dietary Preferences**: Supports various dietary restrictions (vegetarian, vegan, gluten-free, etc.)
- **Cuisine Customization**: Choose from different cuisine types or let AI decide
- **Nutritional Information**: Get detailed nutrition facts for each recipe
- **Responsive Design**: Beautiful interface that works on all devices

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key to `VITE_OPENAI_API_KEY`

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key for recipe generation
- `VITE_SUPABASE_URL`: (Optional) Supabase URL for user data storage
- `VITE_SUPABASE_ANON_KEY`: (Optional) Supabase anonymous key

## How It Works

1. **Add Ingredients**: Enter the ingredients you have available
2. **Set Preferences**: Choose dietary restrictions, cuisine type, cooking time, and servings
3. **Generate Recipes**: AI analyzes your inputs and creates personalized recipes
4. **Get Smart Suggestions**: Receive recommendations for additional ingredients and cuisine types
5. **Cook & Enjoy**: Follow the detailed instructions and nutritional information

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI GPT API
- **Icons**: Lucide React
- **Database**: Supabase (optional)

## API Integration

The app integrates with OpenAI's API to generate intelligent recipe recommendations. The AI considers:
- Available ingredients
- Dietary restrictions and preferences
- Cooking time constraints
- Number of servings needed
- Cuisine preferences

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own recipe adventures!
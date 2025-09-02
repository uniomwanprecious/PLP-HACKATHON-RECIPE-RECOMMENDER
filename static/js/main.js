const fetchRecipes = async () => {
    const ingredients = ingredientsInput.value.trim();

    if (ingredients === "") {
        errorMessage.textContent = "Please enter some ingredients.";
        errorMessage.classList.remove("hidden");
        return;
    }

    // Show loading spinner and hide previous content
    recipesList.innerHTML = "";
    errorMessage.classList.add("hidden");
    loadingSpinner.classList.remove("hidden");
    searchButton.disabled = true;

    try {
        const response = await fetch("/search_recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients: ingredients }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch recipes.");
        }

        const recipes = await response.json();
        
        if (recipes.length === 0) {
            recipesList.innerHTML = "<p>No recipes found. Try different ingredients.</p>";
        } else {
            recipes.forEach(recipe => {
                const recipeCard = document.createElement("div");
                recipeCard.className = "recipe-card";
                recipeCard.innerHTML = `
                    <h3>${recipe.recipeName}</h3>
                    <ul>
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                `;
                recipesList.appendChild(recipeCard);
            });
        }

    } catch (error) {
        console.error("Error fetching recipes:", error);
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    } finally {
        // Hide loading spinner and re-enable button
        loadingSpinner.classList.add("hidden");
        searchButton.disabled = false;
    }
};

searchButton.addEventListener("click", fetchRecipes);

ingredientsInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        fetchRecipes();
    }
});
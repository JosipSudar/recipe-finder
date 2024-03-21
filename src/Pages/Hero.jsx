import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loader from "../assets/infinite-spinner.svg";
import RecipeCard from "@/components/RecipeCard";
import TagFilter from "@/components/TagFilter";
import { db } from "@/utils/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "sonner";

const Hero = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortRecipe, setSortRecipe] = useState("AZ");

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/recipes?limit=100");
      const sortedRecipes = res.data.recipes.sort((a, b) => {
        a.name.localeCompare(b.name);
      });
      setRecipes(
        res.data.recipes.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        )
      );
      setFilteredRecipes(sortedRecipes);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const saveFavorites = async (index) => {
    try {
      const currentRecipe = recipes[index];
      const currentDate = new Date();
      const recipesRef = collection(db, "recipes");
      const querySnapshot = await getDocs(recipesRef);
      const existingRecipes = querySnapshot.docs.find(
        (doc) => doc.data().id === currentRecipe.id
      );
      if (existingRecipes) {
        toast("Recipe already saved!");
        return;
      }
      await addDoc(recipesRef, {
        ...currentRecipe,
        savedAt: currentDate,
      });
      toast("Recipe saved successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const filterRecipesByTag = (tag) => {
    setSelectedTag(tag);
    if (tag === "All") {
      setFilteredRecipes(recipes);
    } else {
      const filter = recipes.filter((recipe) => recipe.tags.includes(tag));
      setFilteredRecipes(filter);
    }
  };

  const sortRecipes = (value) => {
    setSortRecipe(value);
    const sorted = [...filteredRecipes];
    if (value === "AZ") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredRecipes(sorted);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 min-h-screen pb-10">
        <section>
          <TagFilter filterRecipesByTag={filterRecipesByTag} />
        </section>
        <div className="flex items-center flex-col space-y-5 mb-10">
          <h1 className="text-[#00b300] font-bold text-center text-5xl p-5">
            {selectedTag === "All" ? "All Recipes" : `${selectedTag} Recipes`}
          </h1>
          <p className="text-center font-bold text-2xl text-[#00b300]">
            {filteredRecipes.length === 1
              ? `${filteredRecipes.length} result`
              : `${filteredRecipes.length} results`}
          </p>
          <div
            className={
              selectedTag !== "All" ? "hidden" : "flex items-center gap-2"
            }
          >
            <p className="text-center font-bold text-2xl text-[#00b300]">
              Sort by:
            </p>
            <select
              className="border-2 border-[#00b300] rounded-md"
              onChange={(e) => sortRecipes(e.target.value)}
              value={sortRecipe}
            >
              <option value="AZ" selected>
                A - Z
              </option>
              <option value="ZA">Z - A</option>
            </select>
          </div>
        </div>
        <div>
          {isLoading ? (
            <div className="h-screen items-center justify-center flex w-full">
              <img src={Loader} alt="loader" className="w-[100px] h-[100px]" />
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-5 max-w-[1200px] mx-auto md:grid md:grid-cols-3 sm:grid sm:grid-cols-2 gap-4 p-3">
              {filteredRecipes.map((recipe, i) => (
                <Dialog key={i}>
                  <DialogTrigger className="border-2 border-[#00b300] rounded-md m-2 hover:border-[#00b310] transition ease-in-out duration-500 hover:scale-110">
                    <RecipeCard
                      image={recipe.image}
                      name={recipe.name}
                      serving={recipe.servings}
                      difficulty={recipe.difficulty}
                      totalTime={
                        recipe.prepTimeMinutes + recipe.cookTimeMinutes
                      }
                      rating={recipe.rating}
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogDescription className="text-black">
                        <div className="h-full">
                          <div>
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              className="rounded-md w-full h-[200px] object-cover"
                            />
                          </div>
                          <div className="my-2">
                            <h1 className="text-2xl">{recipe.name}</h1>
                          </div>
                          <div className="my-2">
                            <p className="text-lg">
                              {recipe.servings} servings |{" "}
                              {recipe.prepTimeMinutes + recipe.cookTimeMinutes}{" "}
                              minutes | {recipe.difficulty} difficulty
                            </p>
                          </div>
                          <div className="my-2 flex gap-5">
                            <div className="w-1/3">
                              <p className="text-lg">Ingredients:</p>
                              {recipe.ingredients.map((ingredient, i) => (
                                <ul key={i}>
                                  <li className="text-md">{ingredient}</li>
                                </ul>
                              ))}
                            </div>
                            <div className="w-2/3">
                              <p className="text-lg">Instructions:</p>
                              {recipe.instructions.map((instruction, i) => (
                                <ol className="list-decimal" key={i}>
                                  <li key={i} className="text-md">
                                    {instruction}
                                  </li>
                                </ol>
                              ))}
                            </div>
                          </div>
                          <div className="my-2 flex gap-5 items-center">
                            <div className="flex flex-col">
                              <p className="text-lg">
                                Cuisine: {recipe.cuisine}
                              </p>
                              <p className="text-lg">
                                Meal Type: {recipe.mealType.join(", ")}
                              </p>
                              <p className="text-lg">
                                Tags: {recipe.tags.join(", ")}
                              </p>
                              <p className="text-lg">Rating: {recipe.rating}</p>
                            </div>
                            <div className=" text-white w-fit text-center ml-auto">
                              <button
                                className="bg-[#00b300] rounded-md p-2 w-full"
                                onClick={() => saveFavorites(i)}
                              >
                                Add to Favorites
                              </button>
                            </div>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Hero;

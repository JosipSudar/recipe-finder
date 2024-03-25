import { db } from "@/utils/firebaseConfig";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const SavedRecipe = () => {
  const [getFavorites, setGetFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const recipesCollection = collection(db, "recipes");
      const querySnapshot = await getDocs(recipesCollection);
      const favorites = [];
      querySnapshot.forEach((doc) => {
        favorites.push({ id: doc.id, ...doc.data() });
      });
      setGetFavorites(favorites);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const deleteFavorite = async (recipeId) => {
    try {
      const recipeDoc = doc(db, "recipes", recipeId);
      await deleteDoc(recipeDoc);
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  return (
    <main className="p-10 my-10">
      <h1 className="text-3xl text-center font-bold">Saved Recipes</h1>
      {getFavorites.length === 0 && (
        <p className="text-center font-bold text-2xl my-20">
          No saved recipes found.
        </p>
      )}
      {getFavorites.map((recipe, i) => (
        <div
          key={i}
          className="flex items-center border-2 border-[#00b300] w-full p-5 rounded-lg my-5 bg-[#f5f5f5] flex-col space-y-5 md:flex-row"
        >
          <div>
            <p className="text-xl font-extrabold">{i + 1}.</p>
          </div>
          <div className="ml-5">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="rounded-md w-44 h-44 object-contain"
            />
          </div>
          <div className="ml-auto">
            <p className="text-xl m-3 font-bold">{recipe.name}</p>
            <p className="text-xl m-3">
              Ingredients:
              <span className="ml-3">{recipe.ingredients.join(", ")}</span>
            </p>
          </div>
          <div className="ml-auto">
            <p className="text-md text-nowrap">
              Saved at: {recipe.savedAt.toDate().toLocaleString()}
            </p>
          </div>
          <div>
            <RiDeleteBinLine
              className="text-3xl ml-5 cursor-pointer hover:text-red-600 transition-all duration-300 ease-in-out"
              onClick={() => {
                deleteFavorite(recipe.id);
              }}
            />
          </div>
        </div>
      ))}
    </main>
  );
};

export default SavedRecipe;

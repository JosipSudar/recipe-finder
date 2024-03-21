import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TagFilter = ({ filterRecipesByTag }) => {
  const [filterRecipe, setFilterRecipe] = useState([]);

  const fetchTags = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/recipes/tags`);
      setFilterRecipe(["All", ...res.data.sort()]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <section className="flex text-white overflow-x-scroll text-sm text-nowrap font-bold w-full">
      {filterRecipe.map((tag, i) => (
        <button
          key={i}
          className="bg-[#00b300] p-4 text-center"
          onClick={() => filterRecipesByTag(tag)}
        >
          {tag}
        </button>
      ))}
    </section>
  );
};

TagFilter.propTypes = {
  filterRecipesByTag: PropTypes.func.isRequired,
};

export default TagFilter;

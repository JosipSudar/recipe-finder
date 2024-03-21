import { CiStar } from "react-icons/ci";
import { PropTypes } from "prop-types";

const RecipeCard = ({
  image,
  serving,
  difficulty,
  totalTime,
  rating,
  name,
}) => {
  return (
    <div className="flex flex-col items-center space-y-2 bg-gradient-to-b from-gray-50 to-gray-100 p-4 h-full">
      <div className="">
        <img src={image} alt="img" className="rounded-md" />
      </div>
      <div className="text-center">
        <h1 className="text-xl">{name}</h1>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg">Servings: {serving}</p>
        <p className="text-lg">Cooking difficulty: {difficulty}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg">Cooking time: {totalTime} mins</p>
        <p className="text-lg flex items-center">
          Rating: {rating} <CiStar className="text-yellow-500" />
        </p>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  image: PropTypes.string,
  serving: PropTypes.number,
  difficulty: PropTypes.string,
  totalTime: PropTypes.number,
  rating: PropTypes.number,
  name: PropTypes.string,
};

export default RecipeCard;

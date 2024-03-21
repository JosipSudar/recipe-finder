import { PiFolderSimpleUser } from "react-icons/pi";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = () => {
  return (
    <header className="w-full top-0 left-0 right-0 sticky bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="h-[100px] w-[70%] flex items-center justify-between mx-auto">
        <Link to="/">
          <h1 className="md:text-3xl text-[#00b300] font-bold">
            Fork, Knife and Spoon
          </h1>
        </Link>
        <div className="flex text-3xl gap-6 text-[#00b300]">
          <Link to="/favorites">
            <PiFolderSimpleUser />
          </Link>
        </div>
      </div>
      <hr className="border border-[#00b300]" />
    </header>
  );
};

Header.propTypes = {
  recipes: PropTypes.array,
  setFilteredRecipes: PropTypes.func,
};

export default Header;

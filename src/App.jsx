import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./Pages/Hero";
import { PropTypes } from "prop-types";
import SavedRecipe from "./Pages/SavedRecipe";
import { Toaster } from "sonner";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {children}
      <Toaster className="text-[#00b300]" />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/favorites" element={<SavedRecipe />} />
        </Routes>
      </Layout>
    </Router>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;

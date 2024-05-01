import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Model from "./pages/Model";
import About from "./pages/About";
import NoPage from "./pages/NoPage";

function App() {
  return (
    // Router component to enable routing
    <Router>
      <div className="bg-gray-900 text-white">
        {/* Navbar component */}
        <Navbar />
        {/* Define routes */}
        <Routes>
          {/* Route for home page */}
          <Route path="/" element={<HomePage />} />
          {/* Route for model page */}
          <Route path="model" element={<Model />} />
          {/* Route for about page */}
          <Route path="about" element={<About />} />
          {/* Route for any other path */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
      {/* Footer component */}
      <Footer />
    </Router>
  );
}

export default App;

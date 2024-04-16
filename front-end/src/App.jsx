import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Model from './pages/Model';
import About from './pages/About';
import NoPage from './pages/NoPage';


function App() {

  return (
    <Router>
      <div className="bg-gray-900 text-white">
        <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="model" element={<Model />}/>
            <Route path="about" element={<About />}/>
            <Route path="*" element={<NoPage />}/>
          </Routes>
        </div>
        <Footer/>
    </Router>
  )
}

export default App
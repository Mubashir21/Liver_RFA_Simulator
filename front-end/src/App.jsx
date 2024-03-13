import './App.scss'
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
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="model" element={<Model />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
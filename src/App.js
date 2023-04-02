import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/home/Home';
import Favorites from './components/pages/favoriteList/Favorites.js';
import Nav from './components/layout/Nav.js';
import { GlobalStorage } from './components/utilitario/GlobalContext';
import Details from './components/pages/home/Details.js';
import FavoritesDetails from './components/pages/favoriteList/FavoritesDetails.js';
import './global.css';
import Footer from './components/layout/Footer';

function App() {
  return (
    <GlobalStorage>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />

          <Route path="/favorites" element={<Favorites />} />
          <Route path="/favoritesdetails/:id" element={<FavoritesDetails />} />
        </Routes>
        <Footer />
      </Router>
    </GlobalStorage>
  );
}

export default App;

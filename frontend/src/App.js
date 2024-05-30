import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import SearchResults from './pages/searchResults';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import CollectionPage from './pages/collectionPage';
import ItemPage from './pages/itemPage';
import UserPage from './pages/userPage';
import AdminPage from './pages/adminPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/collections" element={<CollectionPage />} />
          <Route path="/collections/:id" element={<CollectionPage />} />
          <Route path="/items/:id" element={<ItemPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

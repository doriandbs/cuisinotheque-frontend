import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/profile/Profile';
import Recipes from './pages/recipes/Recipes';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import AuthProvider from './contexts/AuthContext'; 
import PrivateRoute from './components/privateRoutes/PrivateRoute';
import AddRecipe from './pages/recipes/addRecipe/AddRecipe';
import AllRecipes from './pages/recipes/allRecipes/AllRecipes';
 
const AppRoutes = () => {
  return (
      <AuthProvider>
          <Router>
              <Navbar />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                      path="/profile"
                      element={
                          <PrivateRoute>
                              <Profile />
                          </PrivateRoute>
                      }
                  />
                  <Route
                      path="/recipes"
                      element={
                          <PrivateRoute>
                              <Recipes />
                          </PrivateRoute>
                      }
                  />
                  <Route path="/addrecipe" element={
                    <AddRecipe/>
                  }/>
                   <Route path="/allrecipes" element={
                    <AllRecipes/>
                  }/>
              </Routes>
              <Footer />
          </Router>
      </AuthProvider>
  );
};

export default AppRoutes;

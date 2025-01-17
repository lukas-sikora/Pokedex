import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LoginProvider } from "./context/LoginContext";
import { DataProvider } from "./context/DataContext";
import Navbar from "./components/shared/Navbar";
import Home from "./components/subpages/Home";
import PokemonDetails from "./components/subpages/PokemonDetails";
import Login from "./components/subpages/Login";
import Register from "./components/subpages/Register";
import Favorites from "./components/subpages/Favorites";
import Arena from "./components/subpages/Arena";
import Ranking from "./components/subpages/Ranking";
import Edit from "./components/subpages/Edit";

const App = () => {
  return (
    <ThemeProvider>
      <LoginProvider>
        <DataProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pokemon/:name" element={<PokemonDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/arena" element={<Arena />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="/edit" element={<Edit />} />
            </Routes>
          </Router>
        </DataProvider>
      </LoginProvider>
    </ThemeProvider>
  );
};

export default App;

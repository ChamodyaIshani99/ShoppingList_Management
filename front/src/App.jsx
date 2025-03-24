import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainshopping from "./components/Mainshopping";
import AddItem from "./components/AddItem"; // Make sure this exists
import AllShoppingList from "./components/AllShoppingList";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Mainshopping />} />
        <Route path="/addshoppingList" element={<AddItem />} />
        <Route path="/allshoppinglist" element={<AllShoppingList/>} />
      </Routes>
    </Router>
  );
};

export default App;

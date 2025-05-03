import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainshopping from "./components/Mainshopping";
import AddItem from "./components/AddItem"; 
import Navbar from "./components/Navbar";
import AllShoppingList from "./components/AllShoppingList";
import ShoppingListReport from "./components/ShoppingListReport";


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Mainshopping />} />
        <Route path="/addshoppingList" element={<AddItem />} />
        <Route path="/allshoppinglist" element={<AllShoppingList/>} />
        <Route path="/shoppinglistreport" element={<ShoppingListReport />} />
      </Routes>
    </Router>
  );
};

export default App;

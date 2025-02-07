import Navbar from "./components/layout/Navbar/Navbar";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/pages/itemListContainer/ItemListContainer";
import Cart from "./components/pages/cart/Cart";
import ItemDetail from "./components/pages/itemDetail/ItemlDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:name" element={<ItemDetail />} />
        <Route path="/product/:id" element={<ItemDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

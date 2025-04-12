import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Header from "./components/Header";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [selectedCategory, setSelectedCategory] = useState("all");

  const location = useLocation();
  const showHeader = isLoggedIn && location.pathname !== "/";

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {showHeader && (
        <Header
          setIsLoggedIn={setIsLoggedIn}
          selectedCategory={selectedCategory}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/products" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/products"
          element={
            <ProductList setSelectedCategory={setSelectedCategory} />
          }
        />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
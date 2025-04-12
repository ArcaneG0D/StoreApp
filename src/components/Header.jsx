import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartManager";
import "./Header.css";

function Header({ setIsLoggedIn, selectedCategory }) {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const getTitle = () => {
    if (!selectedCategory || selectedCategory === "all") return "All Products";
    return selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1 className="header-title" onClick={() => navigate("/Products")}>StoreApp</h1>
          <p className="category-subtitle">{getTitle()}</p>
        </div>

        <div className="nav-links">
          <Link to="/Products">Home</Link>
          <Link to="/cart">Cart ({cartItems.length})</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
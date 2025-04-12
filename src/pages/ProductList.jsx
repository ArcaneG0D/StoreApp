import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

function ProductList({ setSelectedCategory }) {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, localSetCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setAllProducts(data);
      });

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    localSetCategory(category);
    setSelectedCategory(category);
    filterProducts(category, searchTerm);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterProducts(selectedCategory, term);
  };

  const filterProducts = (category, term) => {
    let filtered = allProducts;

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (term !== "") {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(term)
      );
    }

    setProducts(filtered);
  };

  return (
    <div className="product-list-container">
      <div className="top-bar">
        <div className="filter-bar">
          <label htmlFor="category-select">Filter:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <img src={product.image} alt={product.title} />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p className="price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
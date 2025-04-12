import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartManager";
import "./ProductDetails.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // pull in cart function

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <div className="product-loading">Loading...</div>;

  const handleAdd = () => {
    addToCart(product); // use CartManager function
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img
          src={product.image}
          alt={product.title}
          className="product-detail-img"
        />
        <div className="product-detail-info">
          <h2 className="product-detail-title">{product.title}</h2>
          <p className="product-detail-desc">{product.description}</p>
          <p className="product-detail-price">₹{(product.price * 80).toFixed(0)}</p>
          <button onClick={handleAdd}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
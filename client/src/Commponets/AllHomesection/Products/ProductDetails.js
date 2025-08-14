import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/" style={{ marginBottom: "20px", display: "inline-block" }}>⬅ Back to Products</Link>
      <div style={{ display: "flex", gap: "20px" }}>
        <img src={product.image} alt={product.title} style={{ width: "200px", height: "200px", objectFit: "contain" }} />
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h3>${product.price}</h3>
          <p>Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from 'lucide-react'; // Search icon import kiya

function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // Search term ke liye naya state

  const url = "https://fakestoreapi.com/products";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let result = [...products];

    // Category filter
    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // Price range filter
    if (priceRange !== "All") {
      if (priceRange === "0-50") {
        result = result.filter((p) => p.price <= 50);
      } else if (priceRange === "50-100") {
        result = result.filter((p) => p.price > 50 && p.price <= 100);
      } else if (priceRange === "100+") {
        result = result.filter((p) => p.price > 100);
      }
    }

    // Search filter
    if (searchTerm) {
        result = result.filter(p => 
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    setFiltered(result);
  }, [category, priceRange, products, searchTerm]); // searchTerm ko dependency array mein add kiya

  return (
    <div style={{ padding: "20px" }}>

      {/* Filters aur Search bar */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
        {/* Category Filter */}
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{height:"3vh",background:"white",border:"0.5px solid black",padding:"2px"}}>
            <option value="All">All</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </label>

        {/* Price Filter */}
        <label>
          Price:
          <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} style={{height:"3vh",background:"white",border:"0.5px solid black",padding:"2px"}}>
            <option value="All">All</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100+">$100+</option>
          </select>
        </label>
        
        {/* Search Input */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    height: '3vh',
                    padding: '2px 10px 2px 30px',
                    border: '0.5px solid black',
                    borderRadius: '5px',
                    width: '200px'
                }}
            />
            <Search size={16} style={{ position: 'absolute', left: '8px', color: '#666' }} />
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {filtered.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
            <div
              style={{
                padding: "20px",
                borderRadius: "5px",
                textAlign: "center",
                height:"30vh",
                background:"white",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s"
              }}
            >
              <img src={product.image} alt={product.title} style={{ width: "200px", height: "130px", objectFit: "contain" }} />
              <h4>{product.title.substring(0, 20)}...</h4>
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

function Products({ searchTerm, onAddToCart }) {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [category, setCategory] = useState("All");
    const [priceRange, setPriceRange] = useState("All");

    const url = "https://fakestoreapi.com/products";

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    useEffect(() => {
        let result = [...products];
        if (category !== "All") {
            result = result.filter((p) => p.category === category);
        }
        if (priceRange !== "All") {
            if (priceRange === "0-50") {
                result = result.filter((p) => p.price <= 50);
            } else if (priceRange === "50-100") {
                result = result.filter((p) => p.price > 50 && p.price <= 100);
            } else if (priceRange === "100+") {
                result = result.filter((p) => p.price > 100);
            }
        }
        if (searchTerm) {
            result = result.filter(p =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFiltered(result);
    }, [category, priceRange, products, searchTerm]);

    const renderStars = (rating) => {
        const stars = [];
        const roundedRating = Math.round(rating);
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={16}
                    style={{ color: i < roundedRating ? '#f59e0b' : '#d1d5db', fill: i < roundedRating ? '#f59e0b' : 'none' }}
                />
            );
        }
        return stars;
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px", display: "flex", gap: "20px", alignItems: "center" }}>
                <label>
                    Category:
                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ height: "3vh", background: "white", border: "0.5px solid black", padding: "2px" }}>
                        <option value="All">All</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="electronics">Electronics</option>
                    </select>
                </label>
                <label>
                    Price:
                    <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} style={{ height: "3vh", background: "white", border: "0.5px solid black", padding: "2px" }}>
                        <option value="All">All</option>
                        <option value="0-50">$0 - $50</option>
                        <option value="50-100">$50 - $100</option>
                        <option value="100+">$100+</option>
                    </select>
                </label>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
                {filtered.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            padding: "20px",
                            borderRadius: "5px",
                            textAlign: "center",
                            height: "40vh",
                            background: "white",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            transition: "transform 0.2s",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}
                    >
                        <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
                            <img src={product.image} alt={product.title} style={{ width: "200px", height: "130px", objectFit: "contain" }} />
                            <h4>{product.title.substring(0, 20)}...</h4>
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                            <div style={{ display: 'flex', marginRight: '0.5rem' }}>{renderStars(product.rating.rate)}</div>
                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>({product.rating.count})</span>
                        </div>
                        <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>${product.price}</p>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onAddToCart(product);
                            }}
                            style={{
                                backgroundColor: '#f0c14b',
                                border: '1px solid #a88734',
                                borderRadius: '5px',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                marginTop: '10px'
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;

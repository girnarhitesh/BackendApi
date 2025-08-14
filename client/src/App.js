import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { Search, Star, ShoppingCart, Trash2 } from 'lucide-react';
import AllHomesection from './Commponets/AllHomesection/AllHomesection'


// Yeh home page ke liye ek dummy component hai.
// const AllHomesection = () => {
//     return (
//         <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0' }}>
//             <h1 style={{ fontSize: '2.5rem', color: '#333' }}>Hamari E-commerce Store Mein Aapka Swagat Hai!</h1>
//             <p style={{ fontSize: '1.2rem', color: '#666' }}>Aap jo chahte hain, wo dhoondhe aur kharidein.</p>
//         </div>
//     );
// };

// Navigation component
const Navigation = ({ cartItems, searchTerm, setSearchTerm }) => {
    const navMainStyle = {
        backgroundColor: '#131921',
        color: 'white',
        padding: '10px 0',
        fontFamily: 'Arial, sans-serif'
    };

    const navContainerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        flexWrap: 'wrap'
    };

    const logoImgStyle = {
        height: '30px',
        padding: '5px'
    };

    const navListStyle = {
        display: 'flex',
        listStyle: 'none',
        margin: '0',
        padding: '0',
        alignItems: 'center'
    };
    
    const navLinkStyle = {
        color: 'white',
        textDecoration: 'none',
        padding: '10px 15px',
        fontWeight: 'bold'
    };

    const searchContainerStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    };

    const searchInputStyle = {
        height: '30px',
        padding: '2px 10px 2px 30px',
        border: 'none',
        borderRadius: '5px',
        width: '300px',
        outline: 'none',
        fontSize: '14px'
    };
    
    const searchIconStyle = {
        position: 'absolute',
        left: '8px',
        color: '#666'
    };

    const cartSectionStyle = {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    };
    
    const cartIconContainerStyle = {
        position: 'relative'
    };

    const cartCounterStyle = {
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        backgroundColor: '#f0c14b',
        color: '#111',
        borderRadius: '50%',
        padding: '2px 6px',
        fontSize: '12px'
    };

    const cartTextStyle = {
        marginLeft: '5px',
        fontSize: '14px'
    };

    return (
        <div style={navMainStyle}>
            <nav>
                <div style={navContainerStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/">
                            <img src="https://placehold.co/100x35/131921/FFFFFF?text=Amazon" alt="Logo" style={logoImgStyle} />
                        </Link>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ul style={navListStyle}>
                            <li>
                                <Link to="/" style={navLinkStyle}>Home</Link>
                            </li>
                            <li>
                                <Link to="/products" style={navLinkStyle}>Products</Link>
                            </li>
                        </ul>
                    </div>
                    <div style={searchContainerStyle}>
                        <input
                            type="text"
                            placeholder="Søg produkter..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={searchInputStyle}
                        />
                        <Search size={16} style={searchIconStyle} />
                    </div>
                    <Link to="/cart" style={{ ...cartSectionStyle, textDecoration: 'none' }}>
                        <div style={cartIconContainerStyle}>
                            <ShoppingCart size={24} style={{ fill: 'white' }} />
                            <span style={cartCounterStyle}>
                                {cartItems.length}
                            </span>
                        </div>
                        <span style={{...cartTextStyle, color: 'white'}}>Cart</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

// Products component
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

// ProductDetail component
function ProductDetail({ onAddToCart }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    // Yahan aapke liye alag-alag rang ke T-shirt ke liye dummy images hain
    const dummyImages = [
        `https://placehold.co/400x400/CCCCCC/000000?text=T-shirt+Gray`,
        `https://placehold.co/400x400/ADD8E6/000000?text=T-shirt+Blue`,
        `https://placehold.co/400x400/90EE90/000000?text=T-shirt+Green`,
        `https://placehold.co/400x400/FFB6C1/000000?text=T-shirt+Pink`
    ];

    useEffect(() => {
        setLoading(true);
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Product not found');
                }
                return res.json();
            })
            .then(data => {
                setProduct(data);
                // Pichli baar ki tarah, pehli image ko badi image ke taur par set karte hain
                setCurrentImage(data.image); 
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const renderStars = (rating) => {
        const stars = [];
        const roundedRating = Math.round(rating);
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={24}
                    style={{ color: i < roundedRating ? '#f59e0b' : '#d1d5db', fill: i < roundedRating ? '#f59e0b' : 'none' }}
                />
            );
        }
        return stars;
    };

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Error: {error}</div>;
    }

    if (!product) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}>Product not found.</div>;
    }

    // Saari images ko ek array mein jodo: main image aur dummy images
    const allImages = [product.image, ...dummyImages];

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ display: 'flex', gap: '40px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Badi image jo selected image dikhayegi */}
                    <img src={currentImage} alt={product.title} style={{ maxWidth: '100%', height: '500px', objectFit: 'contain', border: '1px solid #ddd', borderRadius: '8px' }} />
                    {/* Chhoti thumbnails gallery */}
                    <div style={{ display: 'flex', marginTop: '20px', gap: '10px' }}>
                        {allImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                // Click karne par badi image badal jaayegi
                                onClick={() => setCurrentImage(img)}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    objectFit: 'contain',
                                    border: `2px solid ${currentImage === img ? '#f0c14b' : 'transparent'}`,
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{product.title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ display: 'flex' }}>{renderStars(product.rating.rate)}</div>
                        <span style={{ fontSize: '1rem', color: '#666', marginLeft: '10px' }}>({product.rating.count} reviews)</span>
                    </div>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#B12704', marginBottom: '20px' }}>${product.price}</p>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>{product.description}</p>
                    <button
                        onClick={() => onAddToCart(product)}
                        style={{
                            backgroundColor: '#f0c14b',
                            border: '1px solid #a88734',
                            borderRadius: '8px',
                            padding: '12px 24px',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            marginTop: '30px'
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

// Cart Component
function Cart({ cartItems, onRemoveFromCart }) {
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

    return (
        <div style={{ padding: "20px", maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Aapka Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "1.2em" }}>Aapki cart khali hai.</p>
            ) : (
                <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        {cartItems.map((product, index) => (
                            <div
                                key={`${product.id}-${index}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "20px",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    backgroundColor: "white",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <img src={product.image} alt={product.title} style={{ width: "100px", height: "100px", objectFit: "contain", marginRight: "20px" }} />
                                <div style={{ flexGrow: 1 }}>
                                    <h4 style={{ margin: "0 0 5px 0", fontSize: '1.2em' }}>{product.title}</h4>
                                    <p style={{ margin: "0", fontWeight: "bold", fontSize: '1.1em' }}>${product.price}</p>
                                </div>
                                <button
                                    onClick={() => onRemoveFromCart(product.id)}
                                    style={{
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        padding: '10px 15px',
                                        cursor: 'pointer',
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px"
                                    }}
                                >
                                    <Trash2 size={16} /> Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'right', marginTop: '20px', fontSize: '1.5em', fontWeight: 'bold' }}>
                        Total: ${totalAmount}
                    </div>
                </>
            )}
        </div>
    );
}

// Main App component
const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };
    
    const handleRemoveFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    return (
        <BrowserRouter>
            <Navigation cartItems={cartItems} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Routes>
                <Route path="/" element={<AllHomesection />} />
                <Route path="/products" element={<Products onAddToCart={handleAddToCart} searchTerm={searchTerm} />} />
                <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

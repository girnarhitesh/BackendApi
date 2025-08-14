import React, { useState } from 'react';
import { ChevronDown, Menu, ShoppingCart, User } from 'lucide-react';
import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const [cartCount, setCartCount] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="amazon-nav">
            {/* Main Navigation Bar */}
            <nav className="nav-main">
                <div className="nav-container">
                    {/* Logo */}
                    <div className="logo-section">
                        <img src="/img.png/879.jpg" alt="Logo" />
                    </div>

                    <div className="nav-container">
                        <ul className="nav-list">
                            <li>
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li>
                                <Link to="/products" className="nav-link">Products</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Cart */}
                    <div className="cart-section">
                        <div className="cart-icon-container">
                            <ShoppingCart className="cart-icon" />
                            <span className="cart-counter">
                                {cartCount}
                            </span>
                        </div>
                        <span className="cart-text">Cart</span>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="menu-icon" />
                    </button>
                </div>
            </nav>
        </div>
    );
};
export default Navigation;
 
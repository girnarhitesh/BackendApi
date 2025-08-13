import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, Menu, ShoppingCart, User } from 'lucide-react';
import './Navigation.css';

const AmazonNavigation = () => {
    const [searchCategory, setSearchCategory] = useState('All');
    const [cartCount, setCartCount] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const categories = [
        'All',
        'Electronics',
        'Books',
        'Fashion',
        'Home & Kitchen',
        'Sports',
        'Beauty',
        'Toys & Games',
        'Automotive',
        'Health'
    ];

    return (
        <div className="amazon-nav">
            {/* Main Navigation Bar */}
            <nav className="nav-main">
                <div className="nav-container">
                    {/* Logo */}
                    <div className="logo-section">
                        <img src="client/public/img.png/879.jpg" alt="Logo" />
                    </div>

                    {/* Delivery Location */}
                    <div className="delivery-location">
                        <MapPin className="delivery-icon" />
                        <div>
                            <div className="delivery-text-small">Deliver to girnar</div>
                            <div className="delivery-text-main">Ahmedabad 382415</div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="search-container">
                        <div className="search-wrapper">
                            {/* Category Dropdown */}
                            <div className="category-dropdown-container">
                                <select
                                    value={searchCategory}
                                    onChange={(e) => setSearchCategory(e.target.value)}
                                    className="category-dropdown"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <ChevronDown className="dropdown-arrow" />
                            </div>

                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder="Search Amazon.in"
                                className="search-input"
                            />

                            {/* Search Button */}
                            <button className="search-button">
                                <Search className="search-icon" />
                            </button>
                        </div>
                    </div>

                    {/* Language Selector */}
                    <div className="language-selector">
                        <div className="flag-container">
                            <span className="flag-text">🇮🇳</span>
                        </div>
                        <span className="language-text">EN</span>
                        <ChevronDown className="chevron-icon" />
                    </div>

                    {/* Account Section */}
                    <div className="account-section">
                        <span className="account-greeting">Hello, girnar</span>
                        <div className="account-main">
                            <span className="account-text">Account & Lists</span>
                            <ChevronDown className="chevron-icon" />
                        </div>
                    </div>

                    {/* Returns & Orders */}
                    <div className="returns-section">
                        <span className="returns-small">Returns</span>
                        <span className="returns-main">& Orders</span>
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

                {/* Secondary Navigation */}
                <div className="nav-secondary">
                    <div className="secondary-menu">
                        <div className="secondary-item">
                            <Menu className="secondary-icon" />
                            <span>All</span>
                        </div>
                        <a href="#" className="secondary-item">Fresh</a>
                        <a href="#" className="secondary-item">Amazon miniTV</a>
                        <a href="#" className="secondary-item">Sell</a>
                        <a href="#" className="secondary-item">Best Sellers</a>
                        <a href="#" className="secondary-item">Today's Deals</a>
                        <a href="#" className="secondary-item">Mobiles</a>
                        <a href="#" className="secondary-item">Electronics</a>
                        <a href="#" className="secondary-item">Prime</a>
                        <a href="#" className="secondary-item">Customer Service</a>
                        <a href="#" className="secondary-item">Fashion</a>
                        <a href="#" className="secondary-item">New Releases</a>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
                    <div className="mobile-menu-content">
                        <div className="mobile-menu-item">
                            <User className="user-icon" />
                            <span>Hello, girnar</span>
                        </div>
                        <div className="mobile-menu-item">
                            <MapPin className="user-icon" />
                            <div>
                                <div className="delivery-text-small">Deliver to</div>
                                <div className="delivery-text-main">Ahmedabad 382415</div>
                            </div>
                        </div>
                        <a href="#" className="mobile-menu-link">Account & Lists</a>
                        <a href="#" className="mobile-menu-link">Returns & Orders</a>
                        <a href="#" className="mobile-menu-link">Customer Service</a>
                    </div>
                </div>
            </nav>

            {/* Demo Content */}
            {/* <div className="demo-content">
                <div className="demo-container">
                    <h2 className="demo-title">Amazon-Style Navigation Demo</h2>

                    <div className="demo-grid">
                        <div className="demo-card">
                            <h3 className="demo-card-title">Responsive Design</h3>
                            <p className="demo-card-text">Fully responsive with mobile hamburger menu</p>
                        </div>

                        <div className="demo-card">
                            <h3 className="demo-card-title">Search Functionality</h3>
                            <p className="demo-card-text">Category dropdown and search input</p>
                        </div>

                        <div className="demo-card">
                            <h3 className="demo-card-title">Interactive Elements</h3>
                            <p className="demo-card-text">Hover effects and working dropdowns</p>
                        </div>

                        <div className="demo-card">
                            <h3 className="demo-card-title">Cart Counter</h3>
                            <p className="demo-card-text">Dynamic cart with item counter</p>
                            <button
                                onClick={() => setCartCount(cartCount + 1)}
                                className="add-item-btn"
                            >
                                Add Item
                            </button>
                        </div>
                    </div>

                    <div className="features-section">
                        <h3 className="features-title">Features Include:</h3>
                        <div className="features-grid">
                            <ul className="features-list">
                                <li>• Amazon-style logo and branding</li>
                                <li>• Location delivery selector</li>
                                <li>• Category-based search</li>
                                <li>• Language/region selector</li>
                            </ul>
                            <ul className="features-list">
                                <li>• Account and lists dropdown</li>
                                <li>• Returns & orders section</li>
                                <li>• Shopping cart with counter</li>
                                <li>• Secondary navigation bar</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default AmazonNavigation;
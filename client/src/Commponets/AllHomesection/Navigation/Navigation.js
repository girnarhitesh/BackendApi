import React, { useState } from 'react';
import { ChevronDown, Menu, ShoppingCart, User, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

// Navigation component jise App se props milte hain
const Navigation = ({ cartCount, searchTerm, setSearchTerm }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            {/* Main Navigation Bar */}
            <nav>
                <div style={navContainerStyle}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="https://placehold.co/100x35/131921/FFFFFF?text=Amazon" alt="Logo" style={logoImgStyle} />
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

                    {/* Search Input field */}
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

                    {/* Indkøbskurv */}
                    <div style={cartSectionStyle}>
                        <div style={cartIconContainerStyle}>
                            <ShoppingCart size={24} style={{ fill: 'white' }} />
                            <span style={cartCounterStyle}>
                                {cartCount}
                            </span>
                        </div>
                        <span style={cartTextStyle}>Cart</span>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        style={{ display: 'none' }} 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={24} style={{ color: 'white' }} />
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navigation;

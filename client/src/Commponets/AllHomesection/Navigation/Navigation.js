import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Add Bootstrap JavaScript to your index.html for dropdowns and toggler to work
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

function Navigation() {
    return (
        <header className="bg-white shadow-sm sticky-top">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand h1 text-primary fw-bold" href="/">TechMart</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/products">Products</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="/category/electronics">Electronics</a></li>
                                    <li><a className="dropdown-item" href="/category/clothing">Clothing</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/all-categories">All Categories</a></li>
                                </ul>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <a className="nav-link text-dark me-3" href="/login">Login</a>
                            <button className="btn btn-outline-primary position-relative">
                                <i className="bi bi-cart"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    0
                                    <span className="visually-hidden">items in cart</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navigation;

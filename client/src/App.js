import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ShoppingCart, RefreshCcw } from 'lucide-react';

// Navigation component ko isi file me define kar rahe hain
function Navigation() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/link">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/action">Action</a></li>
                                    <li><a className="dropdown-item" href="/another-action">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="/something-else">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true" href="#">Disabled</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}


const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NOTE: is URL ko aapke deployed backend API ke URL se badal dein.
  // Example: const API_URL = "https://backendapi.onrender.com/api/v1/productstesting";
  const API_URL = "https://backendapi.railway.app/api/v1/productstesting";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (e) {
        setError("Error fetching products: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="ms-3 h4 font-weight-semibold text-muted">
          उत्पाद लोड हो रहे हैं...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-danger text-white p-4 rounded-3">
        <div className="h5 font-weight-medium">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 font-sans antialiased text-dark">
      <Navigation /> {/* Yahan Navigation component ko use karein */}

      {/* Main content area with products */}
      <main className="container my-5">
        <h1 className="text-center mb-5 fw-bold">
          हमारे नवीनतम उत्पाद
        </h1>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {products.map((product) => (
            <div key={product._id} className="col">
              <div className="card h-100 border-0 shadow-sm rounded-3 hover-shadow-lg">
                <div className="card-body d-flex flex-column">
                  <div className="bg-light rounded-top text-center p-5 mb-3">
                    <p className="text-muted">Image Placeholder</p>
                  </div>
                  <h5 className="card-title fw-bold mb-2">{product.name}</h5>
                  <p className="card-text fw-semibold text-primary mb-2">
                    ${product.price}
                  </p>
                  <div className="d-flex justify-content-between align-items-center text-sm text-muted mb-3">
                    <span className="badge bg-light text-secondary">
                      कंपनी: {product.company}
                    </span>
                    {product.featured && (
                      <span className="badge bg-success">
                        विशेष
                      </span>
                    )}
                  </div>
                  <button className="btn btn-primary mt-auto w-100">
                    कार्ट में जोड़ें
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;

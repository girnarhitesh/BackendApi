import { useState, useEffect } from 'react';

// Tailwind CSS classes for a modern, responsive design
const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Proxy setup ke baad, ab API URL ko relative path me likha jaega.
  const API_URL = "/api/v1/productstesting"; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching data from:", API_URL); // Debugging log
        const response = await fetch(API_URL);
        console.log("Response status:", response.status); // Debugging log
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          setProducts(data.products);
        } else {
          // Response is not JSON, might be HTML
          const textData = await response.text();
          console.error("Received non-JSON response:", textData);
          throw new Error("Received non-JSON response from API");
        }
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Products are loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700 p-4">
        <div className="text-lg font-medium">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          हमारे उत्पाद
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
              <p className="text-lg font-semibold text-indigo-600 mb-2">
                ${product.price}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="bg-gray-200 px-3 py-1 rounded-full font-medium">
                  कंपनी: {product.company}
                </span>
                {product.featured && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                    विशेष
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

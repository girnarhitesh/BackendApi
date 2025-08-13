import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from './Commponets/AllHomesection/Navigation/Navigation';
import AllHomesection from './Commponets/AllHomesection/AllHomesection';

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
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<AllHomesection />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

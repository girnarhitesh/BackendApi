import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';

// Yeh mock data hai jismein har product ke liye multiple images hain.
// Ab hum is data ka istemal karenge na ki kisi dummy API ka.
const productsData = [
    {
        id: 1,
        title: "Men's Cotton T-Shirt",
        price: 22.3,
        description: "A comfortable and stylish cotton t-shirt for men. Perfect for everyday wear.",
        category: "men's clothing",
        images: [
            { url: "https://m.media-amazon.com/images/I/61Et+OBxoDL._SY695_.jpg", color: "#CCCCCC" },
            { url: "https://m.media-amazon.com/images/I/61qoD3O9+rL._SY695_.jpg", color: "#ADD8E6" },
            { url: "https://m.media-amazon.com/images/I/510+boW4-UL._SY695_.jpg", color: "#90EE90" },
        ],
        rating: { rate: 3.9, count: 120 }
    },
    {
        id: 2,
        title: "Women's Casual Dress",
        price: 55.99,
        description: "A beautiful and elegant dress for any occasion.",
        category: "women's clothing",
        images: [
            { url: "https://placehold.co/400x400/FFB6C1/000000?text=Dress+Pink", color: "#FFB6C1" },
            { url: "https://placehold.co/400x400/87CEEB/000000?text=Dress+SkyBlue", color: "#87CEEB" },
            { url: "https://placehold.co/400x400/DDA0DD/000000?text=Dress+Plum", color: "#DDA0DD" },
        ],
        rating: { rate: 4.5, count: 250 }
    },
    {
        id: 3,
        title: "Classic Gold Chain",
        price: 150.00,
        description: "A timeless gold chain for a sophisticated look.",
        category: "jewelery",
        images: [
            { url: "https://placehold.co/400x400/FFD700/000000?text=Gold+Chain", color: "#FFD700" },
        ],
        rating: { rate: 4.7, count: 50 }
    },
    {
        id: 4,
        title: "Puma Women Smashic Wmn Sneaker",
        price: 16.59, // I have made this price dynamic based on the mock data
        originalPrice: 44.99,
        brand: "Puma", // Naya brand field joda gaya hai
        description: "A stylish and comfortable sneaker for women, perfect for casual outings.",
        category: "shoes",
        images: [
            { url: "https://placehold.co/400x400/FFFFFF/000000?text=Sneaker+White", color: "#FFFFFF" },
            { url: "https://placehold.co/400x400/FFC0CB/000000?text=Sneaker+Pink", color: "#FFC0CB" },
            { url: "https://placehold.co/400x400/000000/FFFFFF?text=Sneaker+Black", color: "#000000" },
        ],
        rating: { rate: 4.1, count: 733 }
    },
    {
        id: 5,
        title: "Mens Cotton Jacket",
        price: 55.99,
        originalPrice: 150.00,
        brand: "Generic",
        description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, travelling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        category: "men's clothing",
        images: [
            { url: "https://placehold.co/400x400/90EE90/000000?text=T-shirt+Green", color: "#90EE90" },
            { url: "https://placehold.co/400x400/CCCCCC/000000?text=T-shirt+Gray", color: "#CCCCCC" },
            { url: "https://placehold.co/400x400/ADD8E6/000000?text=T-shirt+Blue", color: "#ADD8E6" },
            { url: "https://placehold.co/400x400/FFC0CB/000000?text=T-shirt+Pink", color: "#FFC0CB" },
        ],
        rating: { rate: 4.5, count: 500 }
    }
];

// ProductDetail component
function ProductDetail({ onAddToCart }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        setLoading(true);
        // Ab hum ID ke adhar par mock data se product dhoondh rahe hain.
        // Is tarah, aapka code real-world data ke liye taiyar hai.
        const foundProduct = productsData.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
            // Pehli image ko by default badi image ke roop mein set karte hain.
            setCurrentImage(foundProduct.images[0].url);
            setLoading(false);
        } else {
            setError('Product not found');
            setLoading(false);
        }
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

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
            {/* Breadcrumbs jaisa navigation */}
            <div style={{ fontSize: '0.875rem', color: '#555', marginBottom: '20px' }}>
                <a href="#" style={{ textDecoration: 'none', color: '#0066c0' }}>Shoes & Handbags</a> &gt;
                <a href="#" style={{ textDecoration: 'none', color: '#0066c0' }}>Women's Shoes</a> &gt;
                <a href="#" style={{ textDecoration: 'none', color: '#0066c0' }}>Casual Shoes</a> &gt;
                <span style={{ color: '#c45500' }}>Sneakers</span>
            </div>
            <div style={{ display: 'flex', gap: '40px' }}>
                <div style={{ flex: '0 0 500px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '10px' }}>
                    {/* Yahan chote thumbnails dikha rahe hain */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image.url}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setCurrentImage(image.url)}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    objectFit: 'contain',
                                    border: `2px solid ${currentImage === image.url ? '#c45500' : '#ddd'}`,
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            />
                        ))}
                    </div>
                    {/* Badi image jo selected image dikhayegi */}
                    <img src={currentImage} alt={product.title} style={{ flex: '1', width: 'auto', height: 'auto', objectFit: 'contain', border: '1px solid #ddd', borderRadius: '8px' }} />
                </div>
                <div style={{ flex: '1', padding: '0 20px', backgroundColor: '#fff' }}>
                    {/* Brand name */}
                    <h3 style={{ fontSize: '1rem', color: '#0066c0', marginBottom: '5px' }}>Visit the {product.brand} Store</h3>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{product.title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ display: 'flex' }}>{renderStars(product.rating.rate)}</div>
                        <span style={{ fontSize: '0.9rem', color: '#0066c0', marginLeft: '5px' }}>{product.rating.rate} ({product.rating.count} ratings)</span>
                    </div>
                    <hr style={{ borderTop: '1px solid #ddd', margin: '15px 0' }} />
                    <div style={{ marginBottom: '10px', color: '#c45500', fontSize: '0.9rem', fontWeight: 'bold' }}>Limited time deal</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '10px' }}>
                        {product.originalPrice && (
                             <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#B12704', marginRight: '10px' }}>
                                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                             </p>
                        )}
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#B12704' }}>${product.price}</p>
                    </div>
                    {product.originalPrice && (
                        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '5px' }}>M.R.P.: <span style={{ textDecoration: 'line-through' }}>${product.originalPrice}</span></p>
                    )}
                    <button
                        onClick={() => onAddToCart(product)}
                        style={{
                            backgroundColor: '#FFD814',
                            border: '1px solid #FCD200',
                            borderRadius: '8px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            marginTop: '20px',
                            width: '100%'
                        }}
                    >
                        Add to Cart
                    </button>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333', marginTop: '20px' }}>{product.description}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;

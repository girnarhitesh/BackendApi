import React from 'react';
import { Trash2 } from 'lucide-react';

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
                        {cartItems.map((product) => (
                            <div
                                key={product.id}
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

export default Cart;

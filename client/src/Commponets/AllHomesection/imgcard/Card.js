import React, { useState } from 'react';
import './Cards.css'; // Make sure to use the CSS provided below


function CardSection() {
    const cardData = [
        {
            id: 1,
            title: "Pick up where you left off",
            items: [
                { id: 11, imageUrl: 'https://m.media-amazon.com/images/I/51n2MpdXT+L._AC_SY220_.jpg', text: 'pTron Bassbuds Rogue...' },
                { id: 12, imageUrl: 'https://m.media-amazon.com/images/I/51Bl64-+u7L._AC_SY220_.jpg', text: 'Portronics Conch The...' },
                { id: 13, imageUrl: 'https://m.media-amazon.com/images/I/61BijDYuphL._AC_SY220_.jpg', text: 'Ambrane Type C Wired...' },
                { id: 14, imageUrl: 'https://m.media-amazon.com/images/I/71SnN4n6NnL._AC_SY220_.jpg', text: 'Ambrane Type-C Wire...' },
            ],
            linkText: "See more"
        },
        {
            id: 2,
            title: "Categories to explore",
            items: [
                { id: 21, imageUrl: 'https://m.media-amazon.com/images/I/41iXuJKLzkL._MCnd_AC_.jpg', text: 'Solid soap bars' },
                { id: 22, imageUrl: 'https://m.media-amazon.com/images/I/31qJ7qfj-9L._MCnd_AC_.jpg', text: 'Mice' },
                { id: 23, imageUrl: 'https://m.media-amazon.com/images/I/41CXCDMlNZL._MCnd_AC_.jpg', text: 'Vacuum sealers' },
                { id: 24, imageUrl: 'https://m.media-amazon.com/images/I/41qojMdLeNL._MCnd_AC_.jpg', text: 'Soap holders & disp...' },
            ],
            linkText: "Explore all"
        },
        {
            id: 3,
            title: "Revamp your home in style",
            items: [
                { id: 31, imageUrl: 'https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/2x/372x232_Home_furnishings_2._SY232_CB555629502_.jpg', text: 'Cushion covers, beds...' },
                { id: 32, imageUrl: 'https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/2x/372x232_Home_decor_1._SY232_CB555629502_.jpg', text: 'Figurines, vases & more' },
                { id: 33, imageUrl: 'https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/2x/372x232_Home_storage_1._SY232_CB555629502_.jpg', text: 'Home storage' },
                { id: 34, imageUrl: 'https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/2x/372x232_Home_lighting_2_-_Copy._SY232_CB555629502_.jpg', text: 'Lighting solutions' },
            ],
            linkText: "Explore all"
        },
        {
            id: 4,
            title: "Up to 60% off | Footwear & handbags",
            items: [
                { id: 31, imageUrl: 'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/BAU_BTF/Nov/Nov13/Sports_hi._SY232_CB541153107_.jpg', text: 'Sport shoes' },
                { id: 32, imageUrl: 'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/BAU_BTF/Nov/Nov13/Shoes_Hi._SY232_CB541153107_.jpg', text: 'Men s shoes' },
                { id: 33, imageUrl: 'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/BAU_BTF/Nov/Nov13/Heels_Hi._SY232_CB541153106_.jpg', text: 'woman shoes' },
                { id: 34, imageUrl: 'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/BAU_BTF/Nov/Nov13/HB_Hi._SY232_CB541153106_.jpg', text: 'Handbags' },
            ],
            linkText: "Explore all"
        },
    ];
    
    return (
        <>
            <div className="card-container">
                {cardData.map(card => (
                    <div key={card.id} className="card">
                        <h4>{card.title}</h4>
                        <div className="card-grid">
                            {card.items.map(item => (
                                <div key={item.id} className="card-item">
                                    <img src={item.imageUrl} alt={item.text} />
                                    <span>{item.text}</span>
                                </div>
                            ))}

                        </div>
                        <a href="#">{card.linkText}</a>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CardSection;
import React from 'react';
import '../App.css';

const Product = ({ product }) => (
  <div className="product">
    <img src={product.imageUrl} alt={product.name} className="product-image" />
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <p>Price: ${product.price}</p>
    <p>In Stock: {product.stockQuantity}</p>
    <button>Add to Cart</button>
  </div>
);

export default Product;
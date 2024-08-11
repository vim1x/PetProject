import React from 'react';

const Product = ({ product }) => (
  <div className="product">
    <h2>{product.name}</h2>
    <p>Price: ${product.price}</p>
    <button>Add to Cart</button>
  </div>
);

export default Product;
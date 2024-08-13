import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import { fetchProducts } from '../services/ProductService';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    }
    loadProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map(product => (
        <Product key={product.productID} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

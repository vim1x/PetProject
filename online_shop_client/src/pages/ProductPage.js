import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product Catalog</h1>
            <ul>
                {products.map(product => (
                    <li key={product.productID}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
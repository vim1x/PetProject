import axios from 'axios';

const API_BASE_URL = 'https://localhost:7241/getproducts';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
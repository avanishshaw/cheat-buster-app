import axios from 'axios';

// Use environment variable with fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const searchUserByTerm = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { email: searchTerm } 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
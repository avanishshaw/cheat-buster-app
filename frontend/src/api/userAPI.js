// src/api/userAPI.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const searchUserByTerm = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      // The fix: change the key from 'term' to 'email'
      params: { email: searchTerm } 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
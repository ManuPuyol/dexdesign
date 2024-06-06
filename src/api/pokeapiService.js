// src/api/apiService.js
import axiosInstance from './axiosInstance';

export const fetchAllPokemon = async () => {
    try {
      const response = await axiosInstance.get('/pokemon?limit=10000'); // Limite alto para obtener todos los Pokémon
      return response.data.results;
    } catch (error) {
      console.error('Error fetching all Pokémon:', error);
      throw error;
    }
};

export const fetchPokemonDetails = async (nameOrId) => {
  try {
    const response = await axiosInstance.get(`/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    throw error;
  }
};
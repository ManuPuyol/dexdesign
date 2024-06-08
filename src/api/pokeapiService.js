import axiosInstance from './axiosInstance';

export const fetchAllPokemon = async () => {
    try {
      const response = await axiosInstance.get('/pokemon?limit=100'); // Limite alto para obtener todos los Pokémon
      return response.data.results;
    } catch (error) {
      console.error('Error fetching all Pokémon:', error);
      throw error;
    }
};

export const fetchPokemonDetailsAndSpecies = async (nameOrId) => {
  try {
    const detailsResponse = await axiosInstance.get(`/pokemon/${nameOrId}`);
    const speciesResponse = await axiosInstance.get(`/pokemon-species/${nameOrId}`);
    
    const details = detailsResponse.data;
    const species = speciesResponse.data;
    
    let description = '';
    
    // Buscar descripción en español
    const spanishEntry = species.flavor_text_entries.find(entry => entry.language.name === 'es');
    if (spanishEntry) {
      description = spanishEntry.flavor_text;
    } else {
      // Si no hay descripción en español, buscar en inglés
      const englishEntry = species.flavor_text_entries.find(entry => entry.language.name === 'en');
      if (englishEntry) {
        description = englishEntry.flavor_text;
      } else {
        // Si no hay descripción en inglés, dejar la descripción vacía o poner un mensaje por defecto
        description = 'Description not available';
      }
    }
    
    details.description = description;
    return {
      details: details,
      // Otros detalles necesarios aquí
    };
  } catch (error) {
    console.error('Error fetching Pokémon details and species:', error);
    throw error;
  }
};

export const getPokemonByGeneration = async (generation) => {
  try {
    // Obtener los datos de la generación
    const generationResponse = await axiosInstance.get(`/generation/${generation}`);
    const generationData = generationResponse.data;

    // Obtener las URL de los Pokémon de la generación
    const pokemonUrls = generationData.pokemon_species.map(pokemon => pokemon.url);

    // Obtener los datos de cada Pokémon incluyendo los detalles y la especie
    const pokemonData = await Promise.all(pokemonUrls.map(async url => {
      try {
        const pokemonSpeciesResponse = await axiosInstance.get(url);
        const pokemonSpeciesData = pokemonSpeciesResponse.data;

        // Obtener detalles y especie de cada Pokémon
        const detailsAndSpecies = await fetchPokemonDetailsAndSpecies(pokemonSpeciesData.name);
        return {
          name: pokemonSpeciesData.name,
          details: detailsAndSpecies.details
        };
      } catch (error) {
        console.error(`Error fetching data for Pokémon at URL ${url}:`, error);
        return null; // Retorna null en caso de error
      }
    }));

    // Filtrar los resultados nulos
    return pokemonData.filter(pokemon => pokemon !== null);
  } catch (error) {
    console.error('Error fetching Pokémon data by generation:', error);
    throw error;
  }
};

export const fetchGenerations = async () => {
  try {
    const response = await axiosInstance.get('/generation');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching generations:', error);
    throw error;
  }
};

export const fetchRegionsInfo = async () => {
  try {
    const response = await axiosInstance.get('/region');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
};
export const fetchRegionDetails = async (regionUrl) => {
  try {
    const response = await axiosInstance.get(regionUrl);
    const regionDetails = response.data;
    return regionDetails;
  } catch (error) {
    console.error('Error fetching region details:', error);
    throw error;
  }
};
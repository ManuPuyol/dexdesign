<template>
  <div>
    <PokeCard
      v-for="pokemon in visiblePokemon"
      :key="pokemon.details.name"
      :pokemon="pokemon.details"
    />
  </div>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import { fetchAllPokemon, fetchPokemonDetails } from "../api/pokeapiService";
import PokeCard from "./PokeCard.vue";

export default {
  name: "PokeList",
  components: {
    PokeCard,
  },
  setup() {
    const allPokemon = ref([]);
    const visiblePokemon = ref([]);

    const loadPokemonDetailsInBatches = async () => {
      const batchSize = 100;
      let start = 0;
      while (start < allPokemon.value.length) {
        const batch = allPokemon.value.slice(start, start + batchSize);
        await Promise.all(
          batch.map(async (pokemon) => {
            try {
              const details = await fetchPokemonDetails(pokemon.name);
              pokemon.details = details;
            } catch (error) {
              console.error(
                `Error fetching details for ${pokemon.name}:`,
                error
              );
            }
          })
        );
        start += batchSize;
        // Actualizar visiblePokemon con detalles cargados
        visiblePokemon.value = allPokemon.value.filter(
          (pokemon) => pokemon.details
        );
      }
    };

    const fetchAllPokemonAndDetails = async () => {
      try {
        const pokemonList = await fetchAllPokemon();
        allPokemon.value = pokemonList.map((pokemon) => ({
          name: pokemon.name,
          details: null,
        }));
        // Cargar detalles en lotes
        await loadPokemonDetailsInBatches();
      } catch (error) {
        console.error("Error fetching all Pokémon and details:", error);
      }
    };

    onMounted(() => {
      fetchAllPokemonAndDetails();
    });

    return {
      visiblePokemon,
    };
  },
};
</script>
  
  <style scoped>
/* Estilos del componente */
</style>
  
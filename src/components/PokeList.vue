<template>
  <div class="flex flex-wrap justify-around">
    <PokeCard
      v-for="pokemon in visiblePokemon"
      :key="pokemon.name"
      :pokemon="pokemon.details"
      class="mb-4 mr-4"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getPokemonByGeneration } from "../api/pokeapiService";
import PokeCard from "./PokeCard.vue";

export default {
  name: "PokeList",
  components: {
    PokeCard,
  },
  setup() {
    const visiblePokemon = ref([]);

    const fetchPokemonByGeneration = async (generation) => {
      try {
        const pokemonList = await getPokemonByGeneration(generation);
        pokemonList.sort((a, b) => a.details.id - b.details.id);


        visiblePokemon.value = pokemonList;
      } catch (error) {
        console.error("Error fetching Pokémon by generation:", error);
      }
    };

    onMounted(() => {
      fetchPokemonByGeneration(1); // Especifica la generación deseada aquí
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

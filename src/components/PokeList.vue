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
import { ref, onMounted,watch  } from "vue";
import { getPokemonByGeneration } from "../api/pokeapiService";
import PokeCard from "./PokeCard.vue";
import { eventBus } from "../eventBus";
export default {
  name: "PokeList",
  components: {
    PokeCard,
  },
  setup() {
    const visiblePokemon = ref([]);

    const fetchPokemonByGeneration = async (generation) => {
      console.log(generation)
      try {
        const pokemonList = await getPokemonByGeneration(generation);
        pokemonList.sort((a, b) => a.details.id - b.details.id);


        visiblePokemon.value = pokemonList;
      } catch (error) {
        console.error("Error fetching Pokémon by generation:", error);
      }
    };
    // Watch for changes in selectedGeneration
    watch(() => eventBus.value.selectedGeneration, (newGeneration) => {
          if (newGeneration) {
            fetchPokemonByGeneration(newGeneration);
          }
        });
    onMounted(() => {
      fetchPokemonByGeneration(eventBus.value.selectedGeneration || 'generation-i'); // Especifica la generación inicial deseada aquí
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

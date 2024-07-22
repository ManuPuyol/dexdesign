<template>
  <div class="relative flex flex-wrap justify-around">
    <!-- PokeCard components -->
    <PokeCard
      v-for="pokemon in visiblePokemon"
      :key="pokemon.name"
      :pokemon="pokemon.details"
      @hover="handleHover(true)"
      @leave="handleHover(false)"
      class="mb-4 mr-4"
    />
    <!-- Overlay div -->
    <transition name="fade" v-show="isAnyCardHovered">
      <div
        class="fixed inset-0 bg-black bg-opacity-30 z-20 overlay pointer-events-none"
      ></div>
    </transition>
  </div>
  <div class="flex items-center justify-center min-h-screen" v-if="loading">
    <div class="relative">

    <div class="w-12 h-12 rounded-full animate-spin border-8 border-dashed border-green-500 border-t-transparent">
    </div>
  </div>
</div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
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
    const isAnyCardHovered = ref(false);
    const loading = ref(false);
    const fetchPokemonByGeneration = async (generation) => {
      loading.value = true;
      visiblePokemon.value = [];
      try {
        const pokemonList = await getPokemonByGeneration(generation);
        pokemonList.sort((a, b) => a.details.id - b.details.id);

        visiblePokemon.value = pokemonList;
        loading.value = false;
      } catch (error) {
        console.error("Error fetching Pokémon by generation:", error);
      }
    };
    const handleHover = (hovered) => {
      isAnyCardHovered.value = hovered;
    };

    // Watch for changes in selectedGeneration
    watch(
      () => eventBus.value.selectedGeneration,
      (newGeneration) => {
        if (newGeneration) {
          fetchPokemonByGeneration(newGeneration);
        }
      }
    );
    onMounted(() => {
      fetchPokemonByGeneration(
        eventBus.value.selectedGeneration || "generation-i"
      ); 
    });

    return {
      visiblePokemon,
      handleHover,
      isAnyCardHovered,
      loading
    };
  },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>

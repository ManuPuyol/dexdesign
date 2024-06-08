<template>
  <header class="bg-gray-800 text-white py-4 px-6 flex justify-between items-center shadow sticky top-0 z-50">
    <!-- Logo -->
    <div>
      <img src="@/assets/logo.svg" alt="Logo" class="h-10"> <!-- Ajusta el tamaño del logo según sea necesario -->
    </div>

    <!-- Contenedor para el selector y la barra de búsqueda -->
    <div class="flex items-center">
      <!-- Selector -->
      <div class="relative mr-4">
        <select 
          @change="onGenerationChange"
          v-model="selectedGeneration" 
          class="block appearance-none bg-gray-700 border border-gray-600 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-700"
        >
          <option 
            v-for="generation in generations" 
            :key="generation.url" 
            :value="generation.name"
          >
            {{ getRegionName(generation.name) }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
          <!-- Icono de flecha hacia abajo para el selector -->
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 12l-6-6-1 1 7 7 7-7-1-1z"/>
          </svg>
        </div>
      </div>

      <!-- Barra de búsqueda -->
      <div class="relative">
        <input type="text" class="block bg-gray-700 border border-gray-600 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-700" placeholder="Buscar">
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
          <!-- Icono de búsqueda para la barra de búsqueda -->
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { eventBus } from '../eventBus';

export default {
  name: 'Header', 
  props: {
    generations: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedGeneration: null, 
      generationToRegionMap: {
        'generation-i': 'Kanto',
        'generation-ii': 'Johto',
        'generation-iii': 'Hoenn',
        'generation-iv': 'Sinnoh',
        'generation-v': 'Unova',
        'generation-vi': 'Kalos',
        'generation-vii': 'Alola',
        'generation-viii': 'Galar',
        'generation-ix': 'Paldea'
      }
    };
  },
  methods: {
    getRegionName(generationName) {
      return this.generationToRegionMap[generationName] || generationName;
    },
    onGenerationChange() {
      eventBus.value.selectedGeneration = this.selectedGeneration;
    }
  },
  watch: {
    generations(newGenerations) {
      if (newGenerations.length > 0) {
        this.selectedGeneration = newGenerations[0].name;
        eventBus.value.selectedGeneration = this.selectedGeneration;

      }
    }
  }
};
</script>

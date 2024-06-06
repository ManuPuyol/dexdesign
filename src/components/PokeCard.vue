<template>
  <div>
    <h1>{{ pokemonName }}</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Define la prop pokemon directamente en el setup
const props = defineProps({
  pokemon: Object // Define la prop pokemon
});

// Accede a la prop pokemon
const pokemon = props.pokemon;

// Verifica si pokemon no es null y tiene una propiedad details
const pokemonName = pokemon ? pokemon.name : '';

// Ahora puedes utilizar pokemonName en este componente
</script>

<style scoped>
/* Estilos del componente */
</style>

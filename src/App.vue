<template>
  <div >
    <!-- Encabezado -->
    <Header :generations="generations"/>
    
    <div class="container mx-auto mt-8"> <!-- Agrega margen superior y se centra horizontalmente -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from './components/Header.vue';
import { fetchGenerations } from "./api/pokeapiService";

const generations = ref([])
onMounted(async () => {
  try {
    generations.value = await fetchGenerations();
  } catch (error) {
    console.error('Error fetching generations:', error);
  }
});
</script>

<style lang="scss">
/* Estilos globales */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

body {
  background: rgb(35, 50, 70);
}
</style>
 
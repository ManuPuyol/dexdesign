<template>
  <div
    class="max-w-xs shadow-lg rounded-lg overflow-hidden bg-bottom bg-cover transition-transform duration-300 transform relative card"
    :style="{
      backgroundImage: `url(${backgroundType})`,
      borderColor: typeColor,
      borderStyle: 'solid',
      borderWidth: '1px',
      transform: hover ? 'scale(1.2)' : 'scale(1)',
      zIndex: hover ? '30' : '1',
    }"
    :class="{ 'card-hover': hover }"

    style="height: 300px; max-width: 250px"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
  >
    <div class="w-full flex justify-center">
      <img
        :src="pokemonSprite"
        alt="pokeimg"
        class="w-60 transform translate-y-5"
      />
    </div>
    <div
      :style="{ borderColor: typeColor, backgroundColor: backgroundColor }"
      class="w-full h-full border-t-2 rounded-tr-2xl text-gray-800 bg-opacity-50"
    >
      <div class="flex justify-between mb-4">
        <div
          :style="{ background: typeColor }"
          :class="textColorClass"
          class="rounded-r-3xl p-1 pr-5 pl-5 text-white font-bold z-10"
        >
          <p>{{ capitalizedPokemonName }}</p>
        </div>
        <span :class="textColorClass" class="p-2 pr-4 pl-3 text-sm"
          >N.º{{ pokemonId }}</span
        >
      </div>
      <div class="pl-4 pr-4 text-left text-xs" :class="textColorClass">
        <span>{{ pokemonDescription }}</span>
      </div>
      <PokeCardDetails v-if="hover" />
    </div>
    
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import PokeCardDetails from "./PokeCardDetails.vue";
import electricImage from "@/assets/images/types/electric.jpg";
import bugImage from "@/assets/images/types/bug.jpg";
import fireImage from "@/assets/images/types/fire.jpg";
import waterImage from "@/assets/images/types/water.jpg";
import flyingImage from "@/assets/images/types/flying.jpg";
import darkImage from "@/assets/images/types/dark.jpg";
import psychicImage from "@/assets/images/types/psychic.jpg";
import fairyImage from "@/assets/images/types/fairy.jpg";
import dragonImage from "@/assets/images/types/dragon.jpg";
import iceImage from "@/assets/images/types/ice.jpg";
import steelImage from "@/assets/images/types/steel.jpg";
import rockImage from "@/assets/images/types/rock.jpg";
import grassImage from "@/assets/images/types/grass.jpg";
import groundImage from "@/assets/images/types/ground.jpg";
import poisonImage from "@/assets/images/types/poison.jpg";
import fightImage from "@/assets/images/types/fight.jpg";
import ghostImage from "@/assets/images/types/ghost.jpg";
import normalImage from "@/assets/images/types/normal.jpg";

const props = defineProps({
  pokemon: Object,
});
const typeImages = {
  electric: electricImage,
  fire: fireImage,
  water: waterImage,
  flying: flyingImage,
  bug: bugImage,
  dark: darkImage,
  psychic: psychicImage,
  fairy: fairyImage,
  dragon: dragonImage,
  ice: iceImage,
  steel: steelImage,
  rock: rockImage,
  grass: grassImage,
  ground: groundImage,
  poison: poisonImage,
  fighting: fightImage,
  ghost: ghostImage,
  normal: normalImage,
};
const typeColors = {
  electric: "#FFD700",
  fire: "#FF4500",
  water: "#4169E1",
  flying: "#87CEEB",
  dark: "#2F4F4F",
  psychic: "#FF69B4",
  fairy: "#FFB6C1",
  dragon: "#8A2BE2",
  ice: "#00BFFF",
  steel: "#A9A9A9",
  rock: "#A52A2A",
  grass: "#32CD32",
  ground: "#8B4513",
  poison: "#800080",
  fighting: "#DC143C",
  ghost: "#663399",
  bug: "#A8B820",
  normal: "#A8A878",
};
const pokemon = props.pokemon;

const pokemonName = pokemon.name;
const capitalizedPokemonName =
  pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
const pokemonSprite = pokemon.sprites.other["official-artwork"].front_default;
const pokemonId = pokemon.id;
const pokemonDescription = pokemon.description;
const pokemonMainType = pokemon.types[0].type.name;
const backgroundType = typeImages[pokemonMainType];
const typeColor = typeColors[pokemonMainType];
function hexToRgba(hex, opacity) {
  if (!hex) return `rgba(255, 255, 255, ${opacity})`;
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const backgroundColor = hexToRgba(typeColor, 0.5); // 0.5 para 50% de opacidad
function isColorDark(color) {
  if (color.charAt(0) === "#") {
    color = color.substring(1);
  }
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 128;
}
const textColorClass = isColorDark(typeColor) ? "text-white" : "text-black";

const hover = ref(false);
const emit = defineEmits(["hover", "leave"]);

function handleMouseOver() {
  hover.value = true;
  emit("hover");
}

function handleMouseLeave() {
  hover.value = false;
  emit("leave");
}
</script>
<style scoped>
/* Asegúrate de aplicar la transición de forma suave */
.transition-transform {
  transition: transform 0.3s ease-in-out;
}
.card {
  max-width: 250px;
  height: 300px;
  transition: transform 0.3s ease, max-height 0.3s ease;
  overflow: hidden;
  position: relative;
}

.card-hover {
  max-height: 400px ;  /* Altura máxima cuando se hace hover */
  z-index: 30;
}
</style>
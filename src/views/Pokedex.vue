<template>
  <div>
    <PokeList/>
  </div>
</template>

<script>
// @ is an alias to /src
import PokeList from '@/components/PokeList.vue'

export default {
  name: 'Pokedex',
  components: {
    PokeList
  }
}
</script>

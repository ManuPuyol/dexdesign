import { createRouter, createWebHashHistory } from 'vue-router'
import Pokedex from '../views/Pokedex.vue'

const routes = [
  {
    path: '/',
    name: 'Pokedex',
    component: Pokedex
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

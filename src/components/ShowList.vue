<template>
  <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8">
    <p v-if="loading" class="text-gray-400 text-center py-12">Loading shows...</p>
    <ul
      v-else
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
    >
      <ShowCard v-for="show in shows" :key="show.id" :show="show" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { TVShow } from '@/types'
import ShowCard from '@/components/ShowCard.vue'

const shows = ref<TVShow[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true

  const response = await fetch('https://api.tvmaze.com/shows')
  shows.value = await response.json()
  console.log("  shows.value",  shows.value)

  loading.value = false
})
</script>

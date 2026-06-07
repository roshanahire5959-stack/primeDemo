<template>
  <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8">
    <p v-if="store.error">{{ store.error }}</p>
    <p v-else-if="store.loading" class="text-gray-400 text-center py-12">Loading shows...</p>
    <ul v-else-if='store?.shows?.length'
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <ShowCard v-for="(show, i) in store.shows" :key="i" :show="show" />
    </ul>
    <h1 class="text-5xl text-center" v-else>No Data Found !</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ShowCard from '@/components/ShowCard.vue'
import { useTvShowsStore } from '../store/tvShowsData'

const store = useTvShowsStore()


onMounted(async (): Promise<void> => {
  store.isDisable = false
  try {
    store.loading = true
    await store.getShows()
  } catch (err: unknown) {
    store.error = 'Something went wrong'
  } finally {
    store.loading = false
  }
})
</script>

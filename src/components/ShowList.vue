<template>
  <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8">
    <p v-if="error">{{ error }}</p>
    <p v-if="loading" class="text-gray-400 text-center py-12">Loading shows...</p>
    <ul v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <ShowCard v-for="show in store.shows" :key="show.id" :show="show" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ShowCard from '@/components/ShowCard.vue'
import { useVideosDataStore } from '../store/tvShowsData'

const store = useVideosDataStore()

const loading = ref<boolean>(false)
const error = ref<string>('')

onMounted(async (): Promise<void> => {
  try {
    loading.value = true
    await store.getShows(
      'https://api.tvmaze.com/shows'
    )
  } catch (err: unknown) {
    error.value = 'Something went wrong'
  } finally {
    loading.value = false
  }
})
</script>

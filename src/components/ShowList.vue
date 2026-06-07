<template>
  <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8">
    <p v-if="store.error">{{ store.error }}</p>
    <p v-else-if="store.loading" class="text-gray-400 text-center py-12">Loading shows...</p>
    <ul v-else-if='store?.allShows?.length'
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <ShowCard v-for="(show, i) in store.allShows" :key="i" :show="show" />
    </ul>
    <h1 class="text-5xl text-center" v-else>No Data Found !</h1>
    <div v-if="!store.searchQuery" class="text-center mt-10"> <button
        class="px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
        @click="prew">
        prew</button> <button
        class="px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">{{
          `${currentPage} / ${totalPage} `
        }}</button>
      <button class="px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
        @click="next">next</button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import ShowCard from '@/components/ShowCard.vue'
import { useTvShowsStore } from '../store/tvShowsData'


const store = useTvShowsStore()

onMounted(async (): Promise<void> => {
  store.isDisable = false
  try {
    store.loading = true
    await store.getShows()
    pagination()
  } catch {
    store.error = 'Something went wrong'
  } finally {
    store.loading = false
  }
})



const currentPage = ref<number>(1)
const itemPerPage = ref<number>(20)

const totalPage = computed(() => {
  return Math.ceil(store.tempArr.length / itemPerPage.value)
})

const pagination = async (): Promise<void> => {
  const start: number = (currentPage.value - 1) * itemPerPage.value
  const end: number = start + itemPerPage.value
  store.allShows = store.tempArr.slice(start, end)
  console.log("  store.allShows ", store.allShows.length)
}

const prew = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    pagination()
  }

}

const next = () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value++
    pagination()
  }
}

watch(() => store.loading, (isLoading) => {
  if (!isLoading && !store.searchQuery) {
    pagination()
  }
})
</script>

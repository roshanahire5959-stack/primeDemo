<template>
  <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8">
    <p v-if="store.error">{{ store.error }}</p>
    <p v-else-if="store.loading" class="text-gray-400 text-center py-12">Loading shows...</p>
    <ul v-else-if='store?.shows?.length'
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <ShowCard v-for="(show, i) in store.shows" :key="i" :show="show" />
    </ul>
    <h1 class="text-5xl text-center" v-else>No Data Found !</h1>
    <div class="text-center mt-10"> <button
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
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import ShowCard from '@/components/ShowCard.vue'
import { useTvShowsStore } from '../store/tvShowsData'


const store = useTvShowsStore()

onMounted(async (): Promise<void> => {
  store.isDisable = false
  try {
    store.loading = true
    await store.getShows()
    pagination()
  } catch (err: unknown) {
    store.error = 'Something went wrong'
  } finally {
    store.loading = false
  }
})



const currentPage = ref<number>(1)
const itemPerPage = ref<number>(20)

const totalPage = computed(() => {
  return Math.ceil(store.allShows.length / itemPerPage.value)
})

const pagination = async (): Promise<void> => {
  let start: number = (currentPage.value - 1) * itemPerPage.value
  let end: number = start + itemPerPage.value
  nextTick()
  console.log("store.shows", store.shows)
  store.shows = store.allShows.slice(start, end)
  console.log("  store.shows ", store.shows)
}

const prew = () => {
  if (currentPage.value > 0) {
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
</script>

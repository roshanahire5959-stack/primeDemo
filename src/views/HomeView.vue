<template>
  <ShowList />
</template>

<script setup lang="ts">
import ShowList from '@/components/ShowList.vue'
import { useTvShowsStore } from "../store/tvShowsData"
import { onBeforeRouteLeave } from 'vue-router'
const store = useTvShowsStore()
onBeforeRouteLeave((to, from) => {
  store.searchQuery = ""
  store.isDisable = true
})

</script>

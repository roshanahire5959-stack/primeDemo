<template>
  <li
    class="rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:opacity-90 cursor-pointer"
  >
    <RouterLink :to="{ name: 'show', params: { id: show.id } }" class="block">
      <img
        v-if="show.image"
        :src="show.image.medium"
        :alt="show.name"
        class="w-full aspect-2/3 object-cover"
      />
      <div
        v-else
        class="w-full aspect-2/3 bg-[#0f0f1a] flex items-center justify-center text-gray-500"
      >
        No image
      </div>
      <h3 class="p-2 text-sm font-medium text-white truncate">{{ show.name }}</h3>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { TVShow } from '@/types'

defineProps<{
  show: TVShow
}>()
</script>

<template>
  <header class="sticky top-0 z-50 bg-[#0f0f1a]/90 backdrop-blur-md border-b border-white/5">
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-2 shrink-0">
        <div class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
            />
          </svg>
        </div>
        <span class="font-bold text-white text-lg hidden sm:inline">ShowVault</span>
      </RouterLink>
      <div class="flex-1 max-w-xl">
        <div class="relative">
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search TV shows…"
            class="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all cursor-pointer"
          />
        </div>
      </div>
      <nav class="hidden md:flex items-center gap-1">
        <RouterLink
          :to="{ name: 'home' }"
          class="px-3 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
          active-class="text-white bg-white/5"
        >
          Browse
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

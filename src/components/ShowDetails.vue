<template>
  <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8">
    <p v-if="loading" class="text-gray-400 text-center py-12">Loading show...</p>
    <div v-else-if="show" class="flex flex-col md:flex-row gap-8">
      <img
        v-if="show.image"
        :src="show.image.original"
        :alt="show.name"
        class="w-full md:w-72 rounded-lg object-cover shrink-0"
      />
      <div class="flex-1">
        <h1 class="text-3xl font-bold text-white">{{ show.name }}</h1>
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="genre in show.genres"
            :key="genre"
            class="px-2 py-0.5 text-xs rounded-full bg-white/10 text-gray-300"
          >
            {{ genre }}
          </span>
        </div>
        <dl class="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-400">
          <div v-if="show.rating.average">
            <dt class="text-gray-500">Rating</dt>
            <dd class="text-white">{{ show.rating.average }}</dd>
          </div>
          <div v-if="show.network">
            <dt class="text-gray-500">Network</dt>
            <dd class="text-white">{{ show.network.name }}</dd>
          </div>
          <div v-if="show.premiered">
            <dt class="text-gray-500">Premiered</dt>
            <dd class="text-white">{{ show.premiered }}</dd>
          </div>
          <div v-if="show.status">
            <dt class="text-gray-500">Status</dt>
            <dd class="text-white">{{ show.status }}</dd>
          </div>
          <div v-if="show.language">
            <dt class="text-gray-500">Language</dt>
            <dd class="text-white">{{ show.language }}</dd>
          </div>
          <div v-if="show.runtime">
            <dt class="text-gray-500">Runtime</dt>
            <dd class="text-white">{{ show.runtime }} min</dd>
          </div>
        </dl>
        <div
          v-if="show.summary"
          class="mt-6 text-sm text-gray-300 leading-relaxed"
          v-html="show.summary"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { TVShow } from "@/types";

const route = useRoute();
const show = ref<TVShow | null>(null);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;

  const response = await fetch(`https://api.tvmaze.com/shows/${route.params.id}`);
  show.value = await response.json();

  loading.value = false;
});
</script>

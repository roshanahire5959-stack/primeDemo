import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import type { TVShow } from '@/types'

export const useVideosDataStore = defineStore('videos', () => {

    const allShows = ref<TVShow[]>([])

    const searchQuery = ref<string>("")


    const getShows = async (url: string) => {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Failed to fetch shows (${response.status})`)
        }
        const data: TVShow[] = await response.json()
        allShows.value = data
    }


    const filteredVideos = computed(() => {
        if (searchQuery.value) {
            return allShows.value.filter((el) => {
                return el.name.toLowerCase().includes(searchQuery.value.toLowerCase())
            })
        } else {
            return allShows.value
        }

    })

    return { allShows, getShows, filteredVideos, searchQuery }
})
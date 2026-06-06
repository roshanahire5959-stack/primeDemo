
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TVShow, SearchResult } from '@/types'

export const useVideosDataStore = defineStore('videos', () => {
    const allShows = ref<TVShow[]>([])
    const shows = ref<TVShow[]>([])
    const searchQuery = ref<string>('')

    const getShows = async (url: string): Promise<void> => {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Failed to fetch shows (${response.status})`)
        }
        const data: TVShow[] = await response.json()
        allShows.value = data
        shows.value = [...data]
    }

    const getSearchShows = async (url: string): Promise<void> => {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`error: ${response.status}`);
        }
        const data: SearchResult[] = await response.json()
        shows.value = data.map((el) => el.show)
    }


    return {
        allShows,
        shows,
        searchQuery,
        getShows,
        getSearchShows
    }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TVShow, SearchResult } from '@/types'
const baseUrl = ref<string>('https://api.tvmaze.com')
export const useTvShowsStore = defineStore('videos', () => {
    const allShows = ref<TVShow[]>([])
    const shows = ref<TVShow[]>([])
    const searchQuery = ref<string>('')

    const getShows = async (): Promise<void> => {
        const response = await fetch(`${baseUrl.value}/shows`)
        if (!response.ok) {
            throw new Error(`Failed to fetch shows (${response.status})`)
        }
        const data: TVShow[] = await response.json()
        allShows.value = data
        shows.value = [...data]
    }

    const getSearchShows = async (query: string): Promise<void> => {
        console.log(typeof query)
        const response = await fetch(`${baseUrl.value}/search/shows?q=${query}`)
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

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TVShow, SearchResult } from '@/types'
const baseUrl = import.meta.env.VITE_BASE_URL

export const useTvShowsStore = defineStore('videos', () => {
    const allShows = ref<TVShow[]>([])
    const searchQuery = ref<string>('')
    const loading = ref<boolean>(false)
    const error = ref<string>('')
    const isDisable = ref<boolean>(true)
    const tempArr = ref<TVShow[]>([])

    const getShows = async (): Promise<void> => {
        try {
            loading.value = true
            error.value = ''
            const response = await fetch(`${baseUrl}/shows`)
            if (!response.ok) {
                throw new Error(`Failed to fetch shows (${response.status})`)
            }
            const data: TVShow[] = await response.json()
            allShows.value = data
            tempArr.value = [...allShows.value]
        } catch (err: unknown) {
            if (err instanceof Error) {
                error.value = err.message
            } else {
                error.value = 'Something went wrong'
            }
        } finally {
            loading.value = false
        }
    }

    const getSearchShows = async (query: string): Promise<void> => {
        try {
            loading.value = true
            error.value = ''
            const response = await fetch(`${baseUrl}/search/shows?q=${query}`)
            if (!response.ok) {
                throw new Error(`error: ${response.status}`);
            }
            const data: SearchResult[] = await response.json()
            allShows.value = data.map((el) => el.show)
        } catch (err: unknown) {
            if (err instanceof Error) {
                error.value = err.message
            } else {
                error.value = 'Something went wrong'
            }
        } finally {
            loading.value = false
        }
    }


    return {
        allShows,
        searchQuery,
        loading,
        error,
        getShows,
        getSearchShows,
        isDisable,
        tempArr
    }
})

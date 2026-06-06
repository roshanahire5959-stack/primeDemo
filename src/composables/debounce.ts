export const debounceSearch = <T>(
    fun: (value: T) => void,
    delay: number) => {
    let timer: ReturnType<typeof setTimeout> | null = null
    return (value: T) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            console.log("hello")
            fun(value)
        }, delay)

    }
}


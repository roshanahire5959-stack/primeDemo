export const debounceSearch = <T>(
    fun: (value: T) => void,
    delay: number,
): ((value: T) => void) => {
    let timer: ReturnType<typeof setTimeout> | null = null
    return (value: T) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fun(value)
        }, delay)
    }
}

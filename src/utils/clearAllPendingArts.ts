export default function clearAllPendingArts(): void {
    const keysToRemove = []

    for (const key in window.localStorage) {
        if (key.startsWith('init-')) {
            keysToRemove.push(key)
        }
    }

    for (const key of keysToRemove) {
        localStorage.removeItem(key)
    }
}
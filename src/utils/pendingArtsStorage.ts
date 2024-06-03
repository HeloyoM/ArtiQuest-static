export default function clearAllPendingArts(): void {
    const keys = getArtsInProgressFromLocalStorage()

    for (const key of keys) {
        localStorage.removeItem(key)
    }
}

export const getArtsInProgressFromLocalStorage = () => {
    const inprogressKeys = []

    for (const key in window.localStorage) {
        if (key.startsWith('init-')) {
            inprogressKeys.push(key.split('-').slice(1).join('-'))
        }
    }
    console.log({ inprogressKeys })
    return inprogressKeys
}
export default function clearAllPendingArts(): void {
    const keys = getArtsInProgressFromLocalStorage()

    for (const key of keys) {
        localStorage.removeItem(`init-${key}`)
    }
}

export const removeExceededProcess = (unaliveInBackendIds: string[]) => {
    console.log({ unaliveInBackendIds })

    for(const i of unaliveInBackendIds){
        localStorage.removeItem(`init-${i}`)
    }

}

export const getArtsInProgressFromLocalStorage = () => {
    const inprogressKeys = []

    for (const key in window.localStorage) {
        if (key.startsWith('init-')) {
            inprogressKeys.push(key.split('-').slice(1).join('-'))
        }
    }

    return inprogressKeys
}
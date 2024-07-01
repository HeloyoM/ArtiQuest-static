import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getInprogressArtsByAuthorId } from '../api/article'
import { getArtsInProgressFromLocalStorage, removeExceededProcess } from './pendingArtsStorage'

const useInprogressArts = () => {
    const [livePendingArts, setLivePendingArts] = useState<string[]>([])

    const { data: authorInprogressArts, isLoading } = useQuery({
        queryKey: ['my-inprogress-arts'],
        queryFn: getInprogressArtsByAuthorId
    })

    useEffect(() => {
        if (!authorInprogressArts) return

        const localPendingArts = getArtsInProgressFromLocalStorage()

        const frontendIds = new Set(localPendingArts.map((id: any) => id))
        const cachedIds = new Set(authorInprogressArts.map((a: any) => a.id))

        const availableArts = authorInprogressArts.filter((obj: any) => cachedIds.has(obj.id))

        const unaliveInBackendIds = Array.from(frontendIds).filter(
            (id) => !cachedIds.has(id)
        )

        if (unaliveInBackendIds.length) removeExceededProcess(unaliveInBackendIds)

        setLivePendingArts(availableArts.map((a: any) => a.id))

    }, [authorInprogressArts])


    return { livePendingArts, isLoading }
}

export default useInprogressArts
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getInprogressArtsByAuthorId } from '../api/article'
import { getArtsInProgressFromLocalStorage } from './pendingArtsStorage'

const useInprogressArts = () => {
    const [livePendingArts, setLivePendingArts] = useState<string[]>([])

    const authorInprogressArts = useQuery({
        queryKey: ['my-inprogress-arts'],
        queryFn: getInprogressArtsByAuthorId
    })

    useEffect(() => {
        if (!authorInprogressArts.data) return
        
        const localPendingArts = getArtsInProgressFromLocalStorage()

        const frontendIds = new Set(localPendingArts.map((id: any) => id))
        const cachedIds = new Set(authorInprogressArts.data.map((a: any) => a.id))

        setLivePendingArts(authorInprogressArts.data.filter((obj: any) => frontendIds.has(obj.id)).map((a: any) => a.id))

    }, [authorInprogressArts.data])


    return { livePendingArts }
}

export default useInprogressArts
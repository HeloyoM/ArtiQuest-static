import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getInprogressArtsByAuthorId } from '../api/article'
import { getArtsInProgressFromLocalStorage } from './pendingArtsStorage'

const useInprogressArts = () => {
    const [livePendingArts, setLivePendingArts] = useState<string[]>([])

    const authorInprogressArts = useQuery({
        queryKey: ['my-inprogress-ars'],
        queryFn: getInprogressArtsByAuthorId
    })

    useEffect(() => {
        if (!authorInprogressArts.data) return
        const localPendingArts = getArtsInProgressFromLocalStorage()
        const existingIds = new Set(localPendingArts.map((id: any) => id))

        setLivePendingArts(authorInprogressArts.data.filter((obj: any) => existingIds.has(obj.id)).map((a:any) => a.id))
    }, [authorInprogressArts.data])

    console.log({ authorInprogressArts })


    return { livePendingArts }
}

export default useInprogressArts
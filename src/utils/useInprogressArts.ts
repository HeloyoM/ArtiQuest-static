import { useQuery } from '@tanstack/react-query'
import React from 'react'
import AppUserContext from '../contextes/AppUserContext'
import { getInprogressArtsByAuthorId } from '../api/article'

const useInprogressArts = () => {

    const { user } = React.useContext(AppUserContext)

    const authorInprogressArts = useQuery({
        queryKey: ['my-inprogress-arts'],
        queryFn: getInprogressArtsByAuthorId
    })

    return { authorInprogressArts }
}

export default useInprogressArts
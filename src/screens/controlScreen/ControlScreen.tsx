import React from 'react'
import { useQuery } from '@tanstack/react-query'

import { getAllCategories } from '../../api/articles'
import AppTable from '../../components/AppTable'
import AppPagination from '../../components/common/AppPagination'
import { paginate } from '../../utils/paginate'

const ControlScreen = () => {
    const [page, setPage] = React.useState(1)

    const { isLoading, data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories
    })

    console.log({ categoriesData })

    const handlePaginate = (
        e: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(prev => value)
    }


    const categoriesChunk = React.useMemo(() => {
        return paginate(categoriesData, page, 1)
    }, [categoriesData, page])

    return (
        <React.Fragment>

            <AppTable rows={categoriesChunk[0].arts}/>

            <AppPagination
                paginate={handlePaginate}
                page={page}
                itemsCount={categoriesData.length}
                pageSize={1} />

        </React.Fragment>
    )
}

export default ControlScreen
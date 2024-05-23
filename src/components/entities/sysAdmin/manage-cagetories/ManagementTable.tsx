import React from 'react'
import AppTable from '../../../common/table/AppTable'
import AppPagination from '../../../common/AppPagination'
import useArticleQueries from '../../../article/useArticleQueries'
import { categoriesColumns } from './columns-definition'

type Props = {
    tableData: any
    handlePaginate: (e: React.ChangeEvent<unknown>, value: number) => void
    rows: any[]
    page: number
    items: number
}
const ManagementTable = (props: Props) => {
    const { handleDeleteArticle } = useArticleQueries({})

    return (
        <React.Fragment>
            <AppTable
                rows={props.rows}
                columns={categoriesColumns}
                tableTitle={props.tableData[0].name}
                handleUpdateArticle={() => { }}
                handleDeleteArticle={handleDeleteArticle}
            />

            <AppPagination
                paginate={props.handlePaginate}
                page={props.page}
                itemsCount={props.items}
                pageSize={1} />


        </React.Fragment>
    )
}

export default ManagementTable
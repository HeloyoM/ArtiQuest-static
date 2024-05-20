import { useEffect, useState } from 'react'
import useArticleQueries from '../../components/article/useArticleQueries'
import { Article } from '../../interface/article.interface'
import { Box, Typography } from '@mui/material'
import ManagementTable from '../../components/entities/sysAdmin/manage-cagetories/ManagementTable'
import AppProgress from '../../components/common/AppProgress'
import useCategoryQueries from '../../components/category/useCategoryQueries'
import { ICategory } from '../../interface/category.interface'

const AcceptanceScreen = () => {
    const [pendingArticles, setPendingArticles] = useState<ICategory[]>([])
    const { categories } = useCategoryQueries({})

    useEffect(() => {
        if (!categories.data) return

        const inactiveArticles = categories.data.map((c: ICategory) => {
            const inactiveArts = c.arts.filter((a: Article) => !a.active);
            return { ...c, arts: inactiveArts, len: inactiveArts.length };
        });

        setPendingArticles(inactiveArticles)
    }, [categories.data])

    if (!categories || !pendingArticles.length) return <AppProgress type="Line" />

    return (
        <Box>
            <Typography align="center">Pending articles</Typography>

            {/* <ManagementTable categoriesData={pendingArticles} /> */}
        </Box>
    )
}

export default AcceptanceScreen
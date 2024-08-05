import { DashboardOutlined, TableRowsOutlined } from '@mui/icons-material/'
import { useMediaQuery } from '@mui/material'

type Props = {
    toggleCategoryDisplay: () => void
    categoryDisplay: boolean
}
const ToggleCategoryDisplayButton = (props: Props) => {
    const isMobile = useMediaQuery('(max-width:900px)')

    return (
        !isMobile &&
            props.categoryDisplay ? <DashboardOutlined onClick={props.toggleCategoryDisplay} className='toggle-category-display' />
            : <TableRowsOutlined onClick={props.toggleCategoryDisplay} className='toggle-category-display' />
    )
}
export default ToggleCategoryDisplayButton
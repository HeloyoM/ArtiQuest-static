import React from 'react'
import './style.css'

import useCategoriesTable from '../../utils/useCategoriesTable'

const ControlScreen = () => {
    const { main } = useCategoriesTable()
    return (
        <React.Fragment>
            {main}
        </React.Fragment>
    )
}

export default ControlScreen
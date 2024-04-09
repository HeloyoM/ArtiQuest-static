import React from 'react'
import TitleEditor from './TitleEditor'
import './style.css'

type Props = {
    index: number
}

const Menu = (props: Props) => {
    const [stepWrapper, setStepWrapper] = React.useState<JSX.Element[]>([])
    console.log({ index: props.index })
    const onFieldChange = ({
        target: { value, name } }: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (name === 'title') {

        }

        if (name === 'sub_title') {

        }
    }

    React.useEffect(() => {
        if (!stepWrapper.length)
            setStepWrapper([
                <TitleEditor
                    placeholder='title'
                    name="title"
                    handleChange={onFieldChange} />,
                <TitleEditor
                    name="sub_title"
                    placeholder='sub title'
                    handleChange={onFieldChange}
                />]
            )
    }, [])


    return (
        <div className='editor-menu'>
            {stepWrapper[props.index]}
        </div>
    )
}

export default Menu
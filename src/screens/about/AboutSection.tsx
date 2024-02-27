import { Divider } from '@mui/material'

type Props = {
    title: string
    description: string | JSX.Element | React.ReactElement[]
    backgroundColor: string
}

const AboutSection = (props: Props) => {
    const toupper = props.title.charAt(0).toUpperCase() + props.title.slice(1)

    return (
        <div style={{
            backgroundColor: props.backgroundColor,
            minWidth: '600px',
            minHeight: '43rem',
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex'
        }}>
            <div style={{ width: '20%', fontSize: '2rem', margin: '5%', color: 'skyblue', height: '100%' }}>{toupper}</div>

            {/* <Divider orientation="vertical" variant="middle" flexItem /> */}

            <div style={{
                width: '80%', height: '100%',
                fontSize: '22px', fontWeight: 'bold',
                textAlign: 'center', padding: "8px"
            }}>{props.description}</div>
        </div >
    )
}

export default AboutSection
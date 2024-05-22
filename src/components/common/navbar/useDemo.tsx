import { Box, Button, PopoverOrigin } from "@mui/material"
import React from "react"
import AppPopover from "../AppPopover"

type Props = {
    endDemo: () => void
    isdemo: boolean
}
const useDemo = (props: Props) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
    const [demoSession, setDemoSession] = React.useState<(HTMLElement | null)[]>([])
    const [indexSession, setIndexSession] = React.useState<number>(0)

    React.useEffect(() => {
        if (props.isdemo) {

            startDemo()
        }

    }, [props.isdemo])


    React.useEffect(() => {

        if (demoSession.length) {
            setAnchorEl(demoSession[indexSession])
        }

    }, [demoSession])

    const endDemo = () => {
        setAnchorEl(null)

        props.endDemo()
    }

    const startDemo = () => {
        setDemoSession(definedEl())
    }

    const definedEl = () => {
        const email = document.getElementById('mail')
        const notifications = document.getElementById('notifications')
        const account = document.getElementById('account')
        const navbarEl = [email, notifications, account]

        return navbarEl
    }

    const demoProgress = React.useMemo(() => {
        if (indexSession >= demoSession.length - 1) return 'End'

        else return 'Next'

    }, [anchorEl, indexSession, demoSession])



    const nextDemo = () => {
        if (indexSession >= demoSession.length - 1) {

            endDemo()

        }

        const incIndex = indexSession + 1
        setAnchorEl(null)

        setTimeout(() => {
            setIndexSession(prev => incIndex)
            setAnchorEl(demoSession[incIndex])
        }, 1000)

    }


    const explanationStrings = [
        `when some new articels or new products published you will alerted here.`,
        `In case you'll get some personal message you have this mail section. you can contect us there too.`,
        `Here you can see your profile, edit your details and make more personal things`
    ]

    const popoverOpen = Boolean(anchorEl)

    const anchorOrigin: PopoverOrigin = {
        vertical: 'bottom',
        horizontal: 'center',
    }

    const popover = React.useMemo(() => {
        return (
            // <AppPopover anchorEl={anchorEl}   open={popoverOpen}>
                <>
                <Button onClick={nextDemo}>{demoProgress}</Button></>
            // </AppPopover>
        )
    }, [anchorEl, popoverOpen, demoSession])

    return { popover }
}

export default useDemo
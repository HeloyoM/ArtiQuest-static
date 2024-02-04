import React from 'react'
import moment from 'moment'
import AppModal from '../components/common/modal/AppModal'
// import { userActions } from 'redux/user/user-reducer'
// import { useHistory } from 'react-router-dom'
import { range } from '../utils/rangeOfNumbers'
// import { useTranslation } from 'react-i18next'

const SessionTimeout = () => {
    const [events, setEvents] = React.useState(['click', 'mousemove', 'keydown'])
    const [second, setSecond] = React.useState(0)
    const [isOpen, setIsOpen] = React.useState(false)

    const text = (<div>"In order to protect your privacy <strong>Say=Do</strong> system will logged you out automatically in seconds"</div>)


    let timeStamp: any
    let warningInactiveInterval = React.useRef<any>()
    let startTimerInterval = React.useRef<any>()
    let timeChecker = () => {
        startTimerInterval.current = setTimeout(() => {
            const storedTimeStamp = sessionStorage.getItem('lastTimeStamp')!

            warningInactive(storedTimeStamp)
        }, 10000)
    };

    let warningInactive = (timeString: string) => {
        clearTimeout(startTimerInterval.current)
        warningInactiveInterval.current = setInterval(() => {

            const popTime = 10
            const logoutTime = 30
            const diff = moment.duration(moment().diff(moment(timeString)))
            const minPast = diff.minutes()
            const leftSecond = 18_000 /*30 minutes in seconds */ - diff.seconds()

            if (range(0, popTime).indexOf(leftSecond) !== -1) {
                setSecond(leftSecond)

                setIsOpen(true)
            }

            if (minPast == logoutTime) {
                clearInterval(warningInactiveInterval.current)

                hanldingSignOut()
            }

        }, 1000)
    }

    const hanldingSignOut = () => {
        const payload = {
            // user_id: user_id,
            loginAction: false
        }
        // dispatch(userActions.signOutUser())
        // dispatch(interval_job(payload))
        // history.push(`/`)
    }

    let resetTimer = React.useCallback(() => {
        clearTimeout(startTimerInterval.current)
        clearInterval(warningInactiveInterval.current)

        timeStamp = moment()
        sessionStorage.setItem('lastTimeStamp', timeStamp)
        timeChecker()
        setIsOpen(false)
    }, [])

    React.useEffect(() => {
        // if (!user_id) return
        events.forEach((event) => {
            window.addEventListener(event, resetTimer) //listen to each event that defined above and reset the timer as well
        })

        timeChecker() //by firing any event checking timer

        return () => { //cleanup function that stopping timer
            clearTimeout(startTimerInterval.current)
        }
    }, [resetTimer, events, timeChecker])

    if (!isOpen) {
        return null;
    }

    return (
        <AppModal open={isOpen} popupModal={false} children={text} close={() => { }} />
    )
}

export default SessionTimeout
import * as React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import AppServerMsgContext from '../../contextes/AppServerMsgContext'

export default function AppToast() {

    const { updateServerMsgContext, serverMsg } = React.useContext(AppServerMsgContext)

    React.useEffect(() => {
        if (serverMsg) toast(serverMsg);

        setTimeout(() => {
            updateServerMsgContext('')
        }, 5000)
    }, [serverMsg])

    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                className: '',
                duration: 5000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
                icon: '❌',

                success: {
                    duration: 3000,
                   
                    // theme: {

                    //     primary: 'green',
                    //     secondary: 'black',
                    // },
                },
            }}
        />
    )
}
import * as React from 'react'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import toast, { Toaster } from 'react-hot-toast'

type Props = {
    serverMsg: string
}
export default function AppToast({ serverMsg }: Props) {

    React.useEffect(() => {
        if (serverMsg) toast(serverMsg);
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
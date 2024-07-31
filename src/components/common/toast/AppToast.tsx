import * as React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import AppServerMsgContext from '../../../contextes/AppServerMsgContext'
import emojys from './emojys'
import { Toast } from '../../../enum/Toast.enum'

export default function AppToast() {
    const [state, setState] = React.useState({
        icon: emojys.error,
        duration: 5000,
    })

    const { updateServerMsgContext, serverMsg } = React.useContext(AppServerMsgContext)

    React.useEffect(() => {
        switch (serverMsg) {
            case Toast.ARTICLE_CREATED:
                setState({ icon: emojys.article, duration: 5000 })
                toast(Toast.ARTICLE_CREATED);
                break;
            case Toast.CATEGORY_NOT_FOUND:
                setState({ icon: emojys.error, duration: 5000 })
                toast(Toast.CATEGORY_NOT_FOUND);
                break;
            case Toast.ARTICLE_NOT_FOUND:
                setState({ icon: emojys.error, duration: 5000 })
                toast(Toast.ARTICLE_NOT_FOUND);
                break;
            case Toast.ARTICLE_DELETED:
                setState({ icon: emojys.delete, duration: 5000 })
                toast(Toast.ARTICLE_DELETED);
                break;
            default:
                break;
        }

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
                duration: state.duration,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
                icon: state.icon,

                // success: {
                //     duration: 3000,

                //     // theme: {

                //     primary: 'green',
                //     secondary: 'black',
                // },
                // },
            }}
        />
    )
}
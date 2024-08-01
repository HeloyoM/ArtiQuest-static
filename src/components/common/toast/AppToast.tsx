import * as React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import AppServerMsgContext from '../../../contextes/AppServerMsgContext'
import emojys from './emojys'
import { Toast } from '../../../enum/Toast.enum'

export default function AppToast() {
    const { updateServerMsgContext, serverMsg } = React.useContext(AppServerMsgContext)

    React.useEffect(() => {
        switch (serverMsg) {
            case Toast.ARTICLE_CREATED:
                toast.success(Toast.ARTICLE_CREATED);
                break;
            case Toast.CATEGORY_NOT_FOUND:
                toast.error(Toast.CATEGORY_NOT_FOUND);
                break;
            case Toast.ARTICLE_NOT_FOUND:
                toast.error(Toast.ARTICLE_NOT_FOUND);
                break;
            case Toast.ARTICLE_DELETED:
                toast.success(Toast.ARTICLE_DELETED);
                break;
            case Toast.VOTED:
                toast.success(Toast.VOTED, { icon: emojys.love });
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
                success: {
                    icon: emojys.article,
                    duration: 4000,
                    style: {
                        border: '2px solid green',
                        background: '#fff',
                        color: '#000'
                    }
                },
                error: {
                    icon: emojys.error,
                    duration: 5000,
                    style: {
                        background: '#000',
                        color: '#fff',
                        border: '2px solid red'
                    }
                },
            }}
        />
    )
}
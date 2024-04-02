import React from 'react'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'

type Props = {
    file: File | undefined
}

const FileReviewer = (props: Props) => {
    const { file } = props

    const review = React.useMemo(() => {
        if (!file) return

        else return (
            <DocViewer
                config={{ header: { disableFileName: true } }}
                documents={[{ uri: URL.createObjectURL(file) }]}
                pluginRenderers={DocViewerRenderers}
            />
        )
    }, [file])

    if (review) return review

    else return <></>
}

export default FileReviewer
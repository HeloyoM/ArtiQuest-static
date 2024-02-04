import React from 'react'

type Props = {
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
}
const useUpload = (props: Props) => {
    const handleArtiFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files

        if (files !== null) {

            props.setIsUploading(true)

            const fileSizeInBytes = files[0].size
            const fileSizeInKB = fileSizeInBytes / 1024
            const fileSizeInMB = fileSizeInKB / 1024

            console.log('File size:', fileSizeInBytes, 'bytes');
            console.log('File size:', fileSizeInKB, 'KB');
            console.log('File size:', fileSizeInMB, 'MB');

        }
    }

    return { handleArtiFile }
}

export default useUpload
import React from 'react'
import { UploadErrors } from './interface/fileErrors.interface'
import constants from '../../utils/system/constants'

const useUpload = () => {
    const [error, setError] = React.useState<UploadErrors>({
        fileSizeInMB: false,
        fileExtension: false
    })

    let fileSizeInMB: number = 0
    let exe

    const validateFile = (file: File) => {

        const { name, size } = file
        console.log({ name, size })
        try {
            isValidSizeFile(size)

            isValidFileExtension(name)
        } catch (error) {
            throw Error('Some error occurred while uploading file, check uploading limitations')
        }

    }

    const isValidSizeFile = (size: number): void => {
        const fileSizeInKB = size / 1024

        fileSizeInMB = fileSizeInKB / 1024

        if (fileSizeInMB > constants.MAX_FILE_UPLOAD) {
            setError(prev => ({ ...prev, fileSizeInMB: true }))
        }

    }

    const isValidFileExtension = (name: string) => {

        const fileExtension = name.split('.')

        if (fileExtension.length) {

            exe = fileExtension.pop()?.toLowerCase()
            console.log({ exe })
            if (!constants.FILE_EXE.includes(exe!)) {
                setError(prev => ({ ...prev, fileExtension: true }))
            }
        }
    }


    return { error, validateFile }
}

export default useUpload
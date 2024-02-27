import React from 'react'
import { UploadErrors } from './interface/fileErrors.interface'
import constants from './constants'
import * as pdfjsLib from 'pdfjs-dist'

type Props = {
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>
    setError: React.Dispatch<React.SetStateAction<UploadErrors>>
    setDocxFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

const useUpload = (props: Props) => {
    let fileSizeInMB: number = 0
    let exe

    const handleArtiFile = (event: React.ChangeEvent<HTMLInputElement>) => {

        props.setError({ fileExtension: false, fileSizeInMB: false })

        props.setIsUploading(true)

        const files = event.target.files

        try {
            if (files === null) throw Error('error with file')


            const file = files[0]

            const reader = new FileReader()

            reader.onload = (e) => {
                console.log(typeof e.target?.result)

            }

            reader.readAsArrayBuffer(file)

            props.setDocxFile(file)

            validateFile(file)

            props.setIsUploading(false)

        } catch (error) {
            throw Error('Unable to upload file')
        }
    }

    const validateFile = (file: File) => {

        const { name, size } = file

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
            props.setError(prev => ({ ...prev, fileSizeInMB: true }))
        }

    }

    const isValidFileExtension = (name: string) => {

        const fileExtension = name.split('.')


        if (fileExtension.length) {

            exe = fileExtension.pop()?.toLowerCase()

            if (!constants.FILE_EXE.includes(exe!)) {
                props.setError(prev => ({ ...prev, fileExtension: true }))
            }
        }
    }


    return { handleArtiFile }
}

export default useUpload
import React from 'react'

const useUpload = () => {
    const handleArtiFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files !== null) {
            const fileSizeInBytes = files[0].size
            const fileSizeInKB = fileSizeInBytes / 1024; // Convert to KB
            const fileSizeInMB = fileSizeInKB / 1024; // Convert to MB

            console.log('File size:', fileSizeInBytes, 'bytes');
            console.log('File size:', fileSizeInKB, 'KB');
            console.log('File size:', fileSizeInMB, 'MB');

            // You can perform further validation or processing here
        }
    };

    return { handleArtiFile }
}

export default useUpload
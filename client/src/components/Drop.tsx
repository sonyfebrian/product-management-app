import React from 'react'

import { DropZone } from './Dropzone'
import { FileList } from './Files'

const Dropdown = React.memo(() => {
    // Create "active" state for dropzone:
    const [isDropActive, setIsDropActive] = React.useState(false)
    // Create state for dropped files:
    const [files, setFiles] = React.useState<File[]>([])

    // Create handler for dropzone's onDragStateChange:
    const onDragStateChange = React.useCallback((dragActive: boolean) => {
        setIsDropActive(dragActive)
    }, [])

    // Create handler for dropzone's onFilesDrop:
    const onFilesDrop = React.useCallback((files: File[]) => {
        setFiles(files)
    }, [])

    return (
        <div
            className={`flex justify-center items-center border-2 border-dashed border-gray-400 rounded-md p-4 ${isDropActive ? 'bg-gray-100' : 'bg-white'}`}
        >
            {/* Render the dropzone */}
            <DropZone onDragStateChange={onDragStateChange} onFilesDrop={onFilesDrop}>
                <h2>Drop your files here</h2>

                {files.length === 0 ? (
                    <h3>No files to upload</h3>
                ) : (
                    <h3>Files to upload: {files.length}</h3>
                )}

                {/* Render the file list */}
                <FileList files={files} />
            </DropZone>
        </div>
    )
})

export default Dropdown
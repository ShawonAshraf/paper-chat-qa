// https://www.bezkoder.com/react-typescript-file-upload/

import { useState, useEffect } from "react";
import UploadService from "../utils/requests";

const FileUpload: React.FC = () => {
    const [currentFile, setCurrentFile] = useState<File>();
    const [progress, setProgress] = useState<number>(0);
    const [message, setMessage] = useState<string>("");

    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);
        setProgress(0);
    };

    const upload = () => {
        setProgress(0);
        if (!currentFile) return;

        UploadService.upload(currentFile, (event: any) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                setMessage(response.data.message);
            })
            .then((files) => {
                setFileInfos(files.data);
            })
            .catch((err) => {
                setProgress(0);

                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                ) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage("File has been uploaded.");
                }

                setCurrentFile(undefined);
            });
    };

    return (
        <div>
            <div className="row">
                <div className="col-8">
                    <label className="btn btn-default p-0">
                        <input type="file" onChange={selectFile} />
                    </label>
                </div>

                <div className="col-4">
                    <button
                        className="btn btn-success btn-sm"
                        disabled={!currentFile}
                        onClick={upload}
                    >
                        Upload
                    </button>
                </div>
            </div>

            {currentFile && (
                <div className="progress my-3">
                    <div
                        className="progress-bar progress-bar-info"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: progress + "%" }}
                    >
                        {progress}%
                    </div>
                </div>
            )}

            {message && (
                <div className="alert alert-secondary mt-3" role="alert">
                    {message}
                </div>
            )}
        </div>
    );
};

export default FileUpload;

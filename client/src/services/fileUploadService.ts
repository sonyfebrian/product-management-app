import API from "./api";
import { AxiosResponse, AxiosProgressEvent } from "axios";

const upload = (file: File, onUploadProgress: (progressEvent: ProgressEvent<EventTarget> | AxiosProgressEvent) => void): Promise<AxiosResponse<unknown>> => {
    const formData = new FormData();
  
    formData.append("file", file);
  
    return API.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
};

const FileUploadService = {
    upload,
};

export default FileUploadService;

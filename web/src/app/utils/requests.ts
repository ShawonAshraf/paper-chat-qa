import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-type": "application/json",
    },
});

const upload = (file: File, onUploadProgress: any): Promise<any> => {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};

const sendQuery = (query: string): Promise<Any> => {
    const queryObj = {
        "query": query
    };


    return http.post("/query", queryObj, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const HttpRequestService = {
    upload,
    sendQuery
};

export default HttpRequestService;

import { useState } from "react";
import HttpRequestService from "../utils/requests";

const QueryFrame: React.FC = () => {
    const [currentQuery, setCurrentQuery] = useState<string>();
    const [currentResponse, setCurrentResponse] = useState<string>();

    // handle changes in the query text area
    // https://bobbyhadz.com/blog/react-get-textarea-value
    const handleTextAreaChanges = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentQuery(event.target?.value);
    };

    // send query
    const sendQuery = () => {
        if (!currentQuery) return;

        HttpRequestService.sendQuery(currentQuery)
            .then((response) => {
                setCurrentResponse(response.data.results);
            })
            .catch((err) => {
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                ) {
                    setCurrentResponse(err.response.data.message);
                } else {
                    setCurrentResponse(
                        "Error getting a result from the LLM. Try restarting the API server."
                    );
                }
            });
    };

    return (
        <div className="my-5">
            {/* textarea for query input */}
            <div className="form-group">
                <h2>Query</h2>
                <div className="form-outline">
                    <textarea
                        className="form-control"
                        id="queryTextArea"
                        rows={5}
                        onChange={handleTextAreaChanges}
                    ></textarea>
                </div>

                <div className="col-5">
                    <button
                        className="btn btn-success btn-sm"
                        disabled={!currentQuery}
                        onClick={sendQuery}
                    >
                        Send
                    </button>
                </div>
            </div>

            {/* response */}
            <div className="my-4">
                <h2>Response</h2>
                <div className="my-4">
                    <h6>Your Query : {currentQuery}</h6>
                    <h6>LLAMA2 : </h6>
                    <p id="responseBody">
                        <em>{currentResponse}</em>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QueryFrame;

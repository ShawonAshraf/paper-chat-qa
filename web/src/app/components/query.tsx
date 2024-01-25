const QueryFrame: React.FC = () => {
    return (
        <div className="my-5">
            {/* textarea for query input */}
            <div className="form-group">
                <h2>Query here</h2>
                <form>
                    <div className="form-outline">
                        <textarea
                            className="form-control"
                            id="textAreaExample1"
                            rows="5"
                        ></textarea>
                    </div>
                </form>
            </div>

            {/* response */}
            <div className="my-4">
                <h2>Response</h2>
                <p>
                    <em>Response goes here!</em>
                </p>
            </div>
        </div>
    );
}

export default QueryFrame;
